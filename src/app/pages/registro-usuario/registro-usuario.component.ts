import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
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
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
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
  showDriverRegulation = false;
  disabledForm: boolean = false;
  disabledAcceptButton: boolean = true;

  registerFormName: string = 'Visitantes';
  driverUidReference: string = '';
  formData: FormData = new FormData();
  /**
   * propiedad que contiene el mensaje de exito
   */
  msgExito: string = '';

  departments: Department[] = [];
  visitorTypes: VisitorType[] = [];
  devices: Devices[] = [];
  reasons: ReasonsForAdmissions[] = [];

  fechaMinima!: string;

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    public router: Router,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService,
    public translateHelper: DynamicTranslationsService
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
    this.fechaMinima = this.getFechaActual();
    // console.log(this.router.url, 'RUTA ACTUAL');
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
      ine_field: ['', Validators.required],
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
      ine_field: ['', Validators.required],
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
      ine_field: ['', Validators.required],
      driver_licence_field: ['', Validators.required],
    });
  }

  /**
   * metodo que registra el nuevo  usuario
   */
  submit() {
    this.disabledForm = true;
    let usuario: VisitorForm | ProviderForm | DriverForm = this.form.value;
    if (this.driverUidReference) {
      this.form.get('visitor_type_id')?.setValue(this.driverUidReference);
    }

    console.log(this.form.value);
    if (this.form.invalid) {
      this.disabledForm = false;
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.invalid, 'valido');

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
      this.formData.append('email', usuario.email);
      this.formData.append('contact_name', usuario.contact_name);
      this.formData.append('department_id', usuario.department_id);
      this.formData.append('enter_device', usuario.enter_device);
      this.formData.append('name', usuario.name);
      this.formData.append('visit_company', usuario.visit_company);
      this.formData.append('visit_date', usuario.visit_date);
      this.formData.append('visitor_type_id', usuario.visitor_type_id);
      this.formData.append('hasVehicle', `${usuario.hasVehicle}`);
      this.formData.append('reason_id', usuario.reason_id);
    } else if (this.showDriversRegisterFormFields) {
      const {
        email,
        company_name,
        office_name,
        office_phone,
        operator_name,
        phone,
        visitor_type_id,
        ine_field,
        driver_licence_field,
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
      this.formData.append('email', usuario.email);
      this.formData.append('company_name', usuario.company_name);
      this.formData.append('office_name', usuario.office_name);
      this.formData.append('office_phone', usuario.office_phone);
      this.formData.append('operator_name', usuario.operator_name);
      this.formData.append('phone', usuario.phone);
      this.formData.append('visitor_type_id', usuario.visitor_type_id);
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
      this.formData.append('email', usuario.email);
      this.formData.append('contact_name', usuario.contact_name);
      this.formData.append('department_id', usuario.department_id);
      this.formData.append('enter_device', usuario.enter_device);
      this.formData.append('name', usuario.name);
      this.formData.append('visit_company', usuario.visit_company);
      this.formData.append('visit_date', usuario.visit_date);
      this.formData.append('visitor_type_id', usuario.visitor_type_id);
    }

    // usuario.ine_field = this.form.get('image')?.value;

    this.QRUDService.publicRegisterQRCode(this.formData)
      .then((data: any) => {
        this.msgExito = data.msg;
        this.existeMsgExito = true;
        this.form.reset();
        this.disabledForm = false;
        this.formData = new FormData();
        setTimeout(() => {
          this.existeMsgExito = false;
        }, 2000);
      })
      .catch((err) => {
        this.disabledForm = false;
        if (err.error.errors) {
          this.existeError = true;
          this.errores = err.error.errors;
          this.disabledForm = false;
          this.formData = new FormData();
          setTimeout(() => {
            this.existeError = false;
          }, 2000);
          return;
        }

        if (err.error.err) {
          this.existeError = true;
          this.errorServidor = err.error?.err;
          this.disabledForm = false;
          this.formData = new FormData();
          setTimeout(() => {
            this.existeError = false;
          }, 2000);
          return;
        }
        if (err.err.err) {
          this.errorServidor = err.err?.err;
          this.disabledForm = false;
          this.formData = new FormData();
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
    console.log(visitor, 'tipo visitante');
    this.showRegisterForm = true;
    if (visitor.name == 'Proveedores') {
      this.registerFormName = 'Proveedores';
      this.showProvidersRegisterFormFields = true;
      this.ProviderForm();
    } else if (visitor.name == 'Transportistas') {
      // this.showDriversRegisterFormFields = true;
      this.showDriverRegulation = true;
      this.registerFormName = 'Transportistas';
      // this.DriverForm();
    } else {
      this.registerFormName = 'Visitantes';
      this.showProvidersRegisterFormFields = false;
      // this.showDriversRegisterFormFields = false;
      this.showDriverRegulation = false;
      this.FormularioUsuario();
    }
    this.driverUidReference = visitor.uid;

    this.form.get('visitor_type_id')?.setValue(visitor.uid);
    console.log(this.driverUidReference, 'referencia uid');
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
  backButton() {
    this.disabledAcceptButton = true;
    this.showDriverRegulation = false;
    this.showRegisterForm = false;
    this.showDriversRegisterFormFields = false;
    this.form = this.fb.group({});
    this.form.get('visitor_type_id')?.setValue('');
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.formData.append('ine_field', file);
    }
  }
  onFileChangeLicence(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.formData.append('driver_licence_field', file);
    }
  }
  verifyCheck(e: any) {
    this.disabledAcceptButton = !this.disabledAcceptButton;
  }
  displayDriverForm() {
    console.log(this.driverUidReference, 'referencia uid');
    this.form.get('visitor_type_id')?.setValue(this.driverUidReference);
    this.showDriversRegisterFormFields = true;
    this.showDriverRegulation = false;
    this.DriverForm();
  }
  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }

  getFechaActual(): string {
    const hoy = new Date();
    const fecha = format(hoy, 'yyyy-MM-dd HH:mm'); // Recorta la parte necesaria para el input datetime-local

    return fecha;
  }

  minFechaValidator(minFecha: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaIngresada = new Date(control.value);
      const fechaMinima = new Date(minFecha);

      return fechaIngresada >= fechaMinima ? null : { minFecha: true };
    };
  }
}
