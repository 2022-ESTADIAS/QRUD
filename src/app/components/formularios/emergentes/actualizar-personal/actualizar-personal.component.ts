import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personal } from 'src/app/interfaces/personal.interface';
import { RegistroPersonal } from 'src/app/interfaces/personal.interface';
import { Rol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-actualizar-personal',
  templateUrl: './actualizar-personal.component.html',
  styleUrls: ['./actualizar-personal.component.css'],
})
export class ActualizarPersonalComponent implements OnInit {
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
   * propiedad que contiene los roles del personal
   */
  roles: Rol[] = [];

  /**
   * propiedad que contiene el personal que se va a actualizar
   */
  @Input() personal!: Personal;

  /**
   * propiedad que contiene el id del personal que se va a actualizar
   */
  @Input() idPersonal: any = '';

  /**
   * evento que emite el valor para mostrar/ocultar el modal del formulario reactivo
   */
  @Output() ocultar: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * evento que retorna el arreglo de personal actualizado
   */
  @Output() personalActualizado: EventEmitter<Personal[]> = new EventEmitter();

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService,
    private ErrorServidor: ErrorServidorService,
    private translateHelper: DynamicTranslationsService
  ) {}

  /**
   * Inicializando el formulario reactivo y obtiene los roles del personal para mostrarlos en el formulario
   */
  ngOnInit(): void {
    this.FormularioPersonal();
    this.obtenerRoles();
  }

  /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  FormularioPersonal() {
    this.form = this.fb.group({
      nombre: [this.personal.nombre, Validators.required],
      telefono: [
        this.personal.telefono,
        [Validators.required, Validators.pattern(/^[0-9]\d{9}$/g)],
      ],
      rol: [this.personal.rol._id, Validators.required],
    });
  }
  /**
   * metodo que obtiene los roles del personal
   */
  obtenerRoles() {
    this.QRUDService.ObtenerRegistros('rol')
      .then((data: any) => {
        this.roles = data.roles;
      })
      .catch((err) => {
        if (err.error.msgtk) {
          this.authService.logout();
          return;
        }
        this.ErrorServidor.error();
      });
  }
  /**
   * metodo que actualiza el personal
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // const {nombre,rol,telefono}:RegistroPersonal = this.form.value;
    const { nombre, telefono }: RegistroPersonal = this.form.value;

    const personalActualizado = {
      nombre: nombre.trim().toLowerCase(),
      telefono,
    };

    this.QRUDService.ActualizarRegistros(
      'personal',
      this.idPersonal,
      personalActualizado
    )
      .then((data: any) => {
        this.form.reset();

        this.personalActualizado.emit(data);
        this.ocultar.emit(false);
      })
      .catch((err) => {
        if (err.error.errors) {
          this.existeError = true;
          this.errores = err.error.errors;
          return;
        }

        if (err.error.msgtk) {
          this.authService.logout();
          return;
        }

        this.ErrorServidor.error();
      });
  }

  /**
   * valida campos vacios del formulario reactivo si existen retorna un valor booleano true
   * @param campo recibe un campo del formulario para validar si contiene errores de validacion o no
   */
  campoValido(campo: string) {
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched;
  }
  /**
   * metodo que remueve los mensajes de error solo si existen
   */
  removerAlertas() {
    this.existeError = false;
  }
  /**
   * metodo que oculta el modal del formulario reactivo
   */
  ocultarFormulario() {
    this.ocultar.emit(false);
  }

  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
