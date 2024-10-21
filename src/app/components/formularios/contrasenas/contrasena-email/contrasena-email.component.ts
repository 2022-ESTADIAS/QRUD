import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-contrasena-email',
  templateUrl: './contrasena-email.component.html',
  styleUrls: ['./contrasena-email.component.css'],
})
export class ContrasenaEmailComponent implements OnInit {
  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;
  /**
   * almacena y muestra el mensaje de exito proveido por el backend una vez el correo  se haya generado con exito
   */
  msgExito: string = '';

  /**
   * almacena y muestra el mensaje de error proveido por el backend cuando el email no coincide  o   no exista un error en el servidor
   */
  msgError: string = '';

  /**
   * bandera que permite mostrar el mensaje de error solo si existe un error
   */
  existeError: boolean = false;

  /**
   * bandera que permite mostrar el mensaje de exito solo si se realizo la accion correctamente
   */
  existeMsgExito: boolean = false;

  waitForAnswer: boolean = false;

  /**
   * inyeccion de servicios en el constructor
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private QRUDService: QRUDService,
    private ErrorServidor: ErrorServidorService,
    private translateHelper: DynamicTranslationsService
  ) {}

  /**
   * inicializando el formulario reactivo una vez el componente es cargado
   */
  ngOnInit(): void {
    this.restablecerContrasena();
  }

  /**
   * configuracion inicial el formulario reactivo
   */
  restablecerContrasena() {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }
  /**
   * cuando se presiona el boton de enviar se realiza la peticion al servidor para enviar el correo electronico para restablecer la contraseña
   */
  submit() {
    this.waitForAnswer = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.waitForAnswer = false;
      return;
    }

    const email = this.form.value;

    this.QRUDService.olvideContrasena(email)
      .then((data: any) => {
        this.msgExito = data.msg;
        this.form.reset();
        this.existeMsgExito = true;
        this.waitForAnswer = false;

        setTimeout(() => {
          this.existeMsgExito = false;
          this.router.navigateByUrl('/login');
        }, 1500);
      })
      .catch((err) => {
        this.waitForAnswer = false;
        if (err.error.msg) {
          this.existeError = true;
          this.msgError = err.error.msg;

          setTimeout(() => {
            this.existeError = false;
          }, 1500);
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

  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
