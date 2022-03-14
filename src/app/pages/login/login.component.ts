import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonalLogin } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  msgErrores:string ="";
  existeError:boolean = false;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formularioLogin();
  }

  formularioLogin(){
    this.form = this.fb.group({
      //admin
      // email:["shadow@shadow.com", [Validators.required,Validators.email]],
      // password:["123456",[Validators.required]]

      //master
      email:["koso@koso.com", [Validators.required,Validators.email]],
      password:["123456",[Validators.required]]
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
      this.router.navigateByUrl("/");
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
