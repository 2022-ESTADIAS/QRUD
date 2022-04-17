import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalLogin } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;
  /**
   * propiedad para mostrar mensajes de error solo si existe
   */
  existeError:boolean = false;
  /**
   * propiedad para mostrar los mensajes de error del servidor cuando la contraseña o usuario son incorrectos
   */
  msgErrores:string ="";

  /**
   * propiedad para mostrar/ocultar  el spinner de carga
   */
  loginExistoso:boolean = false;

  /**
   * inyeccion de dependencias
   */
  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private StorageService: StorageService,
    private ErrorServidor:ErrorServidorService

  ) { }

  /**
   * inicializando el formulario reactivo
   */
  ngOnInit(): void {
    this.formularioLogin();
  }

  /**
   * metodo que inicializa los campos y validaciones del formulario reactivo
   */
  formularioLogin(){
    this.form = this.fb.group({

      email:["qrud.app@gmail.com", [Validators.required,Validators.email]],
      password:["T3stkoso!",[Validators.required]]
    })
  }

  /**
   * metodo que realiza el login del usuario y redirecciona al panel de administracion si el login es exitoso
   */
  login(){

    if(this.form.invalid){
      return;
    }

    const personal:PersonalLogin = this.form.value;

    this.loginExistoso = true;
    
    this.AuthService.login(personal).then((data:any) => {
      this.existeError = false;
      this.StorageService.encryptar("nombre",data.personal.nombre);
      setTimeout(() => {
        this.loginExistoso = false;
        this.router.navigateByUrl("/");
        
      },1000)
    }).catch(err =>{
      if(err.error.msg){
        this.existeError = true;
        this.loginExistoso = false;
        this.msgErrores= err.error.msg

      }else{
        this.ErrorServidor.error();
  
      }

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
