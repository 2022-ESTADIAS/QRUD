import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DraftTruck, Truck } from 'src/app/interfaces/mexcal/trucks.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-crear-camion',
  templateUrl: './crear-camion.component.html',
  styleUrls: ['./crear-camion.component.css'],
})
export class CrearCamionComponent implements OnInit {
  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;

  /**
   * propiedad para mostrar mensajes de error solo si existe
   */
  existeError: boolean = false;
  /**
   * propiedad que contiene un arreglo con los mensajes de error proveido por las validaciones del backend
   */
  errores!: [{ msg: string }];

  /**
   * propiedad que contiene el usuario que se va a actualizar
   */

  @Input() camiones: Truck[] = [];

  waitForAnswer: boolean = false;

  /**
   * propiedad que contiene el id del usuario que se va a actualizar
   */

  /**
   * evento que emite el valor para mostrar/ocultar el modal del formulario reactivo
   */
  @Output() ocultar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateCamiones: EventEmitter<Truck[]> = new EventEmitter<Truck[]>();
  @Output() msgExito: EventEmitter<string> = new EventEmitter<string>();

  /**
   * evento que retorna el arreglo de usuarios actualizado
   */
  // @Output() usuarioActualizado:EventEmitter<Usuario[]> = new EventEmitter();

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private ErrorServidor: ErrorServidorService,
    private truckService: TruckService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.FormularioCamion();
  }

  FormularioCamion() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      tract: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', Validators.required],
      vin: ['', Validators.required],
      model: ['', Validators.required],
    });
  }

  campoValido(campo: string) {
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched;
  }
  /**
   * metodo que remueve los mensajes de error solo si existen
   */
  removerAlertas() {
    this.existeError = false;
  }

  ocultarFormulario() {
    this.ocultar.emit(false);
  }

  submit() {
    this.waitForAnswer = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.waitForAnswer = false;
      return;
    }
    const { brand, company, email, model, name, tract, vin, year }: DraftTruck =
      this.form.value;

    const truck: DraftTruck = {
      brand: brand.trim().toLowerCase(),
      company: company.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      model: model.trim().toLowerCase(),
      name: name.trim().toLowerCase(),
      tract: tract.trim().toLowerCase(),
      vin: vin.trim().toLowerCase(),
      year: year,
    };

    this.truckService
      .createTruck(truck)
      .then((data) => {
        this.camiones.push(data.truck);
        this.waitForAnswer = false;
        this.msgExito.emit(data.message);
        this.updateCamiones.emit(this.camiones);
        this.ocultarFormulario();
      })
      .catch((err) => {
        this.waitForAnswer = false;
        if (err.error.msgtk) {
          this.authService.logout();
          return;
        }

        this.ErrorServidor.error();
      });
  }
}
