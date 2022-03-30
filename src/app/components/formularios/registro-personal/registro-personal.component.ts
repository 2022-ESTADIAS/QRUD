import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroPersonal } from 'src/app/interfaces/personal.interface';
import { QRUDService } from 'src/app/services/qrud.service';

import { DetallePorRol } from 'src/app/interfaces/rol.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
@Component({
  selector: 'app-registro-personal',
  templateUrl: './registro-personal.component.html',
  styleUrls: ['./registro-personal.component.css']
})
export class RegistroPersonalComponent implements OnInit {

  form!: FormGroup;
  roles:DetallePorRol[] = [];
  existeError: boolean = false;
  errores!:[{msg:string}]
  msgExito:string = "";
  existeMsgExito:boolean = false;


  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
    this.FormularioPersonal();
    
  }

  FormularioPersonal() {

    this.form =   this.fb.group({
      nombre:["", Validators.required],
      telefono:["", [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)] ],
      password:["", Validators.required,Validators.pattern(/^(?=.\d)(?=.[\u0021-\u002b\u003c-\u0040])(?=.[A-Z])(?=.[a-z])\S{8,16}$/)],
      email:["",[Validators.required,Validators.email]  ],
      rol:["", Validators.required],
    })

  

  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    
    const {email,nombre,password,rol,telefono}:RegistroPersonal = this.form.value;
    const personal = {
      email: email.trim().toLowerCase(),
      nombre: nombre.trim().toLowerCase(),
      password: password.trim(),
      rol,
      telefono
    }

    this.QRUDService.crearRegistro("personal",personal).then((data:any) =>{
        console.log(data);
        this.msgExito = data.msg;
        this.existeMsgExito = true;
        this.form.reset();
  
        setTimeout(() =>{
          this.existeMsgExito = false;
        },2000);

    }).catch((err) =>{
      console.log(err);
      if(err.error.erros){
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
  obtenerRoles(){
    this.QRUDService.ObtenerRegistros('rol').then((data:any) => {
      this.roles = data.roles
    }).catch(err =>{
      if(err.error.msgtk){
        this.authService.logout();
        return;
      }
      this.ErrorServidor.error();
    })
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }



  removerAlertas(){
    this.existeError = false;
  }


}
