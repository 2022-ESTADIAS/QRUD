import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {

  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;
   /**
   * propiedad para mostrar mensajes de error solo si existe 
   */
  existeError: boolean = false; 
  /**
   * propiedad que contiene el mensaje de error proveido por las validaciones del backend
   */
  error:string = "";
  
  /**
   * propiedad para mostrar mensajes de exito solo si se realiza el cambio de constraseña exitosamente
   */
  existemsgExito:boolean = false;
  /**
   * propiedad que contiene el mensaje de exito proveido por el backend solo si se realiza el cambio de constraseña exitosamente
   */
  msgExito:string = "";

  /**
   * propiedad que contiene el nombre del personal que desea cambiar la contraseña
   */
  nombreUsuario:string = "";

  /**
   * inyeccion de dependencias
   */
  constructor(
    private QRUDService: QRUDService,
    private fb: FormBuilder,
    private authService: AuthService,
    private ErrorServidor:ErrorServidorService,
    private StorageService: StorageService
  ) { }

  /**
   * inicializando el formulario reactivo y obteniendo el nombre del usuario
   */
  ngOnInit(): void {
  this.cambiarContrasena()  
  this.nombre();


  }
  /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  cambiarContrasena(){
    this.form = this.fb.group({
      lastpwd:["",[Validators.required,Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]],
      newpwd:["",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/g)]],
      newpwd2:["",[Validators.required]]
    },{validators:this.passwordsIguales("newpwd","newpwd2")})
  }
    /**
   * metodo que se encarga de realizar el cambio de contraseña y enviar el mensaje de exito o error al usuario en caso de que se haya realizado o no
   */
  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const actualizarContrasena = this.form.value;

    this.QRUDService.cambiarContrasena(actualizarContrasena).then((data:any) => {
      this.msgExito = data.msg
      this.form.reset();
      this.existemsgExito = true;

      setTimeout(() => {
        this.existemsgExito = false;
      },1500)

    }).catch((err) => {

      if(err.error.msg){
        this.error = err.error.msg;
        this.existeError = true;
  
        setTimeout(() => {
          this.existeError = false; 
        },1500)
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
 * validacion personalizada que se encarga de validar que las contraseñas sean iguales
 */
  passwordsIguales(pass1:string,pass2:string){
    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
  
      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsigual:true});
      }
    }
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
   * obtiene el nombre del usuario que desea cambiar la contraseña 
   */
  nombre(){
    this.nombreUsuario = this.StorageService.desencriptar("nombre");

  }

}
