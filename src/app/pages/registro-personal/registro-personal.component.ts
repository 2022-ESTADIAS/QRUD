import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroPersonal } from 'src/app/interfaces/personal.interface';
import { Rol } from 'src/app/interfaces/rol.interface';
import { QRUDService } from 'src/app/services/qrud.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-registro-personal',
  templateUrl: './registro-personal.component.html',
  styleUrls: ['./registro-personal.component.css'],
})
export class RegistroPersonalComponent implements OnInit {
  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;
  /**
   * propiedad que contiene los roles del personal
   */
  roles: Rol[] = [];
  /**
   * propiedad para mostrar mensajes de error solo si existe
   */
  existeError: boolean = false;

  /**
   * propiedad que contiene un arreglo con los mensajes de error proveido por las validaciones del backend
   */
  errores!: [{ msg: string }];
  /**
   * propiedad que muestra el mensaje de exito solo si el registro del personal fue exitoso
   */
  existeMsgExito: boolean = false;
  /**
   * propiedad que contiene el mensaje de exito
   */
  msgExito: string = '';

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService,
    private ErrorServidor: ErrorServidorService
  ) {}
  /**
   * Inicializando el formulario reactivo y obtiene los roles del personal para mostrarlos en el formulario
   */
  ngOnInit(): void {
    this.obtenerRoles();
    this.FormularioPersonal();
  }
  /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  FormularioPersonal() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]\d{9}$/g)],
      ],
      // password:["", Validators.required,Validators.pattern(/^(?=.\d)(?=.[\u0021-\u002b\u003c-\u0040])(?=.[A-Z])(?=.[a-z])\S{8,16}$/)],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }
  /**
   * metodo que registra el nuevo  personal
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, nombre, password, rol, telefono }: RegistroPersonal =
      this.form.value;
    const personal = {
      email: email.trim().toLowerCase(),
      nombre: nombre.trim().toLowerCase(),
      password: password.trim(),
      rol,
      telefono,
    };

    this.QRUDService.crearRegistro('personal', personal)
      .then((data: any) => {
        this.msgExito = data.msg;
        this.existeMsgExito = true;
        this.form.reset();

        setTimeout(() => {
          this.existeMsgExito = false;
        }, 2000);
      })
      .catch((err) => {
        if (err.error.erros) {
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
}
