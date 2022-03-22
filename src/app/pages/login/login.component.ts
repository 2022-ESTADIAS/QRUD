import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalLogin } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
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
    private StorageService: StorageService
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

    this.AuthService.login(personal).then((data) => {
      console.log(data)
      this.existeError = false;
      this.StorageService.encryptar("nombre",data.personal.nombre);
      this.loginExistoso = true;
      setTimeout(() => {
        this.loginExistoso = false;
        this.router.navigateByUrl("/");

      },1000)
    }).catch(err =>{
      console.log(err.error.msg)
      this.existeError = true;
      this.msgErrores= err.error.msg
    })
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  removerAlertas(){
    this.existeError = false;
  }




}
