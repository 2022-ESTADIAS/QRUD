import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Department,
  VisitorForm,
  VisitorType,
} from 'src/app/interfaces/mexcal/index.interface';
import { RegistroUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
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
   * almacena el mensaje de eror en caso de que el servidor no responda
   */
  errorServidor: string = '';

  /**
   * propiedad que muestra el mensaje de exito solo si el registro del usuario fue exitoso
   */
  existeMsgExito: boolean = false;

  /**
   * propiedad que contiene el mensaje de exito
   */
  msgExito: string = '';

  departments: Department[] = [];
  visitorTypes: VisitorType[] = [];

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private router: Router,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService
  ) {}

  /**
   * Inicializando el formulario reactivo una vez se inicie el componente
   */
  ngOnInit(): void {
    this.getDepartments();
    this.getVisitorTypes();
    this.FormularioUsuario();
  }
  /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  FormularioUsuario() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      visit_company: ['', Validators.required],
      visit_date: ['', [Validators.required]],
      contact_name: ['', Validators.required],
      department_id: ['', Validators.required],
      enter_device: ['', [Validators.required]],
      visitor_type_id: ['', Validators.required],
    });
  }
  /**
   * metodo que registra el nuevo  usuario
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {
      email,
      contact_name,
      department_id,
      enter_device,
      name,
      visit_company,
      visit_date,
      visitor_type_id,
    }: VisitorForm = this.form.value;

    const usuario: VisitorForm = {
      email: email.trim().toLowerCase(),
      contact_name: contact_name.trim().toLowerCase(),
      department_id: department_id.trim().toLowerCase(),
      enter_device: enter_device.trim().toLowerCase(),
      name: name.trim().toLowerCase(),
      visit_company: visit_company.trim().toLowerCase(),
      visit_date: visit_date.trim().toLowerCase(),
      visitor_type_id: visitor_type_id.trim().toLowerCase(),
    };

    this.QRUDService.publicRegisterQRCode(usuario)
      .then((data: any) => {
        this.msgExito = data.msg;
        this.existeMsgExito = true;
        this.form.reset();

        setTimeout(() => {
          this.existeMsgExito = false;
        }, 2000);
      })
      .catch((err) => {
        if (err.error.errors) {
          this.existeError = true;
          this.errores = err.error.errors;
          return;
        }

        if (err.error.err) {
          this.errorServidor = err.error?.err;
          return;
        }

        if (err.error.msgtk) {
          this.AuthService.logout();
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

  getDepartments() {
    this.QRUDService.getAllDepartments().then((data) => {
      this.departments = data.departments;
    });
  }
  getVisitorTypes() {
    this.QRUDService.visitorsTypes().then((data) => {
      this.visitorTypes = data.visitorTypes;
    });
  }
}
