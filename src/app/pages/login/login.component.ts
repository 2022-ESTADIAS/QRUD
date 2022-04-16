import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalLogin } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  msgErrores:string ="";
  existeError:boolean = false;

  loginExistoso:boolean = false;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private StorageService: StorageService,
    private ErrorServidor:ErrorServidorService

  ) { }

  ngOnInit(): void {
    this.formularioLogin();
  }

  formularioLogin(){
    this.form = this.fb.group({

      //master
      email:["qrud.app@gmail.com", [Validators.required,Validators.email]],
      password:["T3stkoso!",[Validators.required]]
    })
  }

  login(){

    if(this.form.invalid){
      return;
    }

    const personal:PersonalLogin = this.form.value;

    this.loginExistoso = true;
    
    this.AuthService.login(personal).then((data) => {
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

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  removerAlertas(){
    this.existeError = false;
  }




}
