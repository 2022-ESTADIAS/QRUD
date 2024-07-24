import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Department,
  Devices,
  DriverForm,
  ProviderForm,
  ReasonsForAdmissions,
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
  showRegisterForm: boolean = false;
  showProvidersRegisterFormFields = false;
  showDriversRegisterFormFields = false;

  /**
   * propiedad que contiene el mensaje de exito
   */
  msgExito: string = '';

  departments: Department[] = [];
  visitorTypes: VisitorType[] = [];
  devices: Devices[] = [];
  reasons: ReasonsForAdmissions[] = [];

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
    this.getDevices();
    this.FormularioUsuario();
    this.getReasons();
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

  ProviderForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      visit_company: ['', Validators.required],
      visit_date: ['', [Validators.required]],
      contact_name: ['', Validators.required],
      department_id: ['', Validators.required],
      enter_device: ['', [Validators.required]],
      visitor_type_id: ['', Validators.required],
      reason_id: ['', Validators.required],
      hasVehicle: ['', Validators.required],
    });
  }
  DriverForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      company_name: ['', Validators.required],
      operator_name: ['', Validators.required],
      phone: ['', [Validators.required]],
      office_name: ['', Validators.required],
      office_phone: ['', Validators.required],
      visitor_type_id: ['', Validators.required],
    });
  }

  /**
   * metodo que registra el nuevo  usuario
   */
  submit() {
    let usuario: VisitorForm | ProviderForm | DriverForm = this.form.value;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.showProvidersRegisterFormFields) {
      const {
        email,
        contact_name,
        department_id,
        enter_device,
        name,
        visit_company,
        visit_date,
        visitor_type_id,
        hasVehicle,
        reason_id,
      }: ProviderForm = this.form.value;
      usuario = {
        email: email.trim().toLowerCase(),
        contact_name: contact_name.trim().toLowerCase(),
        department_id: department_id.trim().toLowerCase(),
        enter_device: enter_device.trim().toLowerCase(),
        name: name.trim().toLowerCase(),
        visit_company: visit_company.trim().toLowerCase(),
        visit_date: visit_date.trim().toLowerCase(),
        visitor_type_id: visitor_type_id.trim().toLowerCase(),
        hasVehicle,
        reason_id,
      };
    } else if (this.showDriversRegisterFormFields) {
      const {
        email,
        company_name,
        office_name,
        office_phone,
        operator_name,
        phone,
        visitor_type_id,
      }: DriverForm = this.form.value;
      usuario = {
        email: email.trim().toLowerCase(),
        company_name: company_name.trim().toLowerCase(),
        office_name: office_name.trim().toLowerCase(),
        office_phone: office_phone.trim().toLowerCase(),
        operator_name: operator_name.trim().toLowerCase(),
        phone: phone.trim().toLowerCase(),
        visitor_type_id: visitor_type_id.trim().toLowerCase(),
      };
    } else {
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
      usuario = {
        email: email.trim().toLowerCase(),
        contact_name: contact_name.trim().toLowerCase(),
        department_id: department_id.trim().toLowerCase(),
        enter_device: enter_device.trim().toLowerCase(),
        name: name.trim().toLowerCase(),
        visit_company: visit_company.trim().toLowerCase(),
        visit_date: visit_date.trim().toLowerCase(),
        visitor_type_id: visitor_type_id.trim().toLowerCase(),
      };
    }

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
  getDevices() {
    this.QRUDService.devices().then((data) => {
      this.devices = data.devices;
    });
  }
  getReasons() {
    this.QRUDService.reasons().then((data) => {
      this.reasons = data.reasons;
    });
  }

  openRegisterModal(visitor: VisitorType) {
    this.showRegisterForm = true;
    if (visitor.name == 'Proveedores') {
      this.showProvidersRegisterFormFields = true;
      this.ProviderForm();
    } else if (visitor.name == 'Transportistas') {
      this.showDriversRegisterFormFields = true;
      this.DriverForm();
    } else {
      this.showProvidersRegisterFormFields = false;
      this.showDriversRegisterFormFields = false;
      this.FormularioUsuario();
    }
    this.form.get('visitor_type_id')?.setValue(visitor.uid);
  }

  getClass(type: string) {
    if (type === 'Visitantes') {
      return 'visits';
    } else if (type === 'Proveedores') {
      return 'providers';
    } else {
      return 'drivers';
    }
  }
}
