import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroPersonal } from 'src/app/interfaces/personal.interface';
import { QRUDService } from 'src/app/services/qrud.service';

import { DetallePorRol } from 'src/app/interfaces/rol.interface';
import { Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
    this.FormularioPersonal();
    
  }

  FormularioPersonal() {

    this.form =   this.fb.group({
      nombre:["shadow", Validators.required],
      telefono:["12", [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)] ],
      password:["123456", Validators.required],
      email:["shadow@shadow.com",[Validators.required,Validators.email]  ],
      rol:["", Validators.required],
    })

  

  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    
    const personal:RegistroPersonal = this.form.value;

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
      this.existeError = true
      this.errores = err.error.errors

      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
      }
    })

  }
  obtenerRoles(){
    this.QRUDService.ObtenerRegistros('rol').then((data:any) => {
      this.roles = data.roles
    }).catch(err =>{
      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
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
