import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Truck } from 'src/app/interfaces/mexcal/trucks.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';

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

  @Input() camion!: Truck;

  /**
   * propiedad que contiene el id del usuario que se va a actualizar
   */
  @Input() idUsuario: any = '';

  /**
   * evento que emite el valor para mostrar/ocultar el modal del formulario reactivo
   */
  @Output() ocultar: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * evento que retorna el arreglo de usuarios actualizado
   */
  // @Output() usuarioActualizado:EventEmitter<Usuario[]> = new EventEmitter();

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private ErrorServidor: ErrorServidorService
  ) {}

  ngOnInit(): void {
    this.FormularioCamion();
  }

  FormularioCamion() {
    this.form = this.fb.group({
      name: [this.camion.name, Validators.required],
      email: [this.camion.email, [Validators.required, Validators.email]],
      company: [this.camion.company, Validators.required],
      tract: [this.camion.tract, Validators.required],
      brand: [this.camion.brand, Validators.required],
      year: [this.camion.year, Validators.required],
      vin: [this.camion.vin, Validators.required],
      model: [this.camion.model, Validators.required],
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
