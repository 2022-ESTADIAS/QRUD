import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroRol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {

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
  errores!:[{msg:string}]

  /**
   * propiedad que muestra el mensaje de exito solo si el registro del rol fue exitoso
   */
  existeMsgExito:boolean = false;
  
  /**
   * propiedad que contiene el mensaje de exito
   */
  msgExito:string = "";

  /**
   * inyeccion de servicios
   */
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }

    /**
     * Inicializando el formulario reactivo una vez se inicie el componente
     */
  ngOnInit(): void {
    this.FormularioRol();
  }

  /**
   * metodo que inicializa el formulario reactivo con sus respectivos campos y validaciones
   */
  FormularioRol(){

    this.form =   this.fb.group({
      rol:["", Validators.required],
      description:["rol", Validators.required],
    })
  }

   /**
   * metodo que registra el nuevo  rol
   */
  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {description,rol:rolActual }:RegistroRol = this.form.value;
    
      const rol ={
        rol:rolActual.toLowerCase().trim(),
        description: description.trim().toLowerCase(),
      }

    this.QRUDService.crearRegistro("rol",rol).then((data:any) => {
      this.msgExito = data.msg;
      this.existeMsgExito = true;
      this.form.reset();

      setTimeout(() =>{
        this.existeMsgExito = false;
      },2000);


    }).catch(err => {
      if(err.error.errors){
        this.existeError = true
        this.errores = err.error.errors
        return;
      }
      if(err.error.msgtk){
        this.AuthService.logout();
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


}
