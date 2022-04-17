import { Component, OnInit, EventEmitter , Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroUsuario, Usuario } from 'src/app/interfaces/usuario.interface';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {
  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;

  /**
   * propiedad para mostrar mensajes de error solo si existe 
   */
  existeError:boolean = false;
  /**
   * propiedad que contiene un arreglo con los mensajes de error proveido por las validaciones del backend
   */
  errores!:[{msg:string}];



  /**
   * propiedad que contiene el usuario que se va a actualizar
   */

  @Input() usuario!:Usuario

  /**
   * propiedad que contiene el id del usuario que se va a actualizar
   */
  @Input() idUsuario:any = ""

  /**
   * propiedad que contiene el arreglo de usuarios activos que devuelve el backend
   */
  usuarios:Usuario[] = [];
  /**
   * evento que emite el valor para mostrar/ocultar el modal del formulario reactivo
   */
  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * evento que retorna el arreglo de usuarios actualizado
   */
  @Output() usuarioActualizado:EventEmitter<Usuario[]> = new EventEmitter();

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService,
    private ErrorServidor:ErrorServidorService
    ) { }

    /**
     * Inicializando el formulario reactivo
     */
  ngOnInit(): void {
    this.FormularioUsuario();
    
 
  }
   /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  FormularioUsuario(){
    this.form =   this.fb.group({
      nombre:[this.usuario.nombre, Validators.required], 
      rfc:[this.usuario.rfc, [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
      telefono:[this.usuario.telefono,  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
      direccion:[this.usuario.direccion, Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]],
    })

  }
  /**
   * metodo que actualiza el usuario en el backend
   */
  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {email,direccion,nombre,rfc,telefono }:RegistroUsuario = this.form.value;
    
    const usuarioActualizado:RegistroUsuario = {
      email: email.trim().toLowerCase(),
      direccion: direccion.trim().toLowerCase(),
      nombre: nombre.trim().toLowerCase(),
      rfc: rfc.trim().toLowerCase(),
      telefono,
    };

    this.QRUDService.ActualizarRegistros("user",this.idUsuario,usuarioActualizado).then((data:any) => {
  
      this.form.reset();

        this.usuarioActualizado.emit(data);
        this.ocultar.emit(false);

    }).catch(err => {
      if(err.error.errors){
        this.existeError = true;
        this.errores = err.error.errors;
        return;
      }

      if(err.error.msgtk){
        this.authService.logout();
        return;
      }

      this.ErrorServidor.error();
    })
  }

  /**
   * valida campos vacios del formulario reactivo si existen retorna un valor booleano true
   * @param campo recibe un campo del formulario para validar si contiene errores de validacion o no
   */
  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }
  /**
 * metodo que remueve los mensajes de error solo si existen
 */
  removerAlertas(){
    this.existeError = false;
  }
 /**
  * metodo que oculta el modal del formulario reactivo
  */ 
ocultarFormulario(){
  this.ocultar.emit(false);
}

}
