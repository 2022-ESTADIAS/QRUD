import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-restablecer-contrasena-email',
  templateUrl: './restablecer-contrasena-email.component.html',
  styleUrls: ['./restablecer-contrasena-email.component.css']
})
export class RestablecerContrasenaEmailComponent implements OnInit {

  
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
  msgError: string ='';

    /**
   * propiedad que contiene el mensaje de exito proveido por el backend solo si se realiza el cambio de constraseña exitosamente
   */
  msgExito:string = "";
  /**
   * propiedad para mostrar mensajes de exito solo si se realiza el cambio de constraseña exitosamente
   */
  existemsgExito:boolean = false;

  /**
   * proiedad privada que almacena  el token que viene en el url
   */
  private token:any;
  /**
   * propiedad privada  que contiene el id del usuario que se va a restablecer la contraseña el cual se recibe por la url
   */
  private id:any;

  /**
   * inyectando servicios
   */
  constructor(
    private QRUDService: QRUDService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ErrorServidor:ErrorServidorService

  ) { }

  /**
   * cuando se inicializa el componente se obtienen los datos del url para realizar el cambio de contrasena y se inicializa el formulario reactivo 
   */
  ngOnInit(): void {
  this.cambiarContrasena()
  this.route.queryParams.subscribe((data:any) =>{
    this.token = data.token;
    this.id = data.id;
  })
  
}
  /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  cambiarContrasena(){
    this.form = this.fb.group({
      newpwd:["",[Validators.required,Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)  ]],
      again:["",[Validators.required]]
    },{validators:this.passwordsIguales("newpwd","again")})
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

    this.QRUDService.restablecerContrasenaCorreo(actualizarContrasena,this.id,this.token).then((data:any) => {
      this.msgExito = data.msg
      this.form.reset();
      this.existemsgExito = true;

      setTimeout(() => {
        this.existemsgExito = false;
        this.router.navigateByUrl("/login")
      },1500)

    }).catch(err => {
       
        if(err.error.err){
          this.msgError = err.error.err; 
          this.existeError = true;
          setTimeout(() =>{
            this.existeError = false;
          },1500)
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


}
