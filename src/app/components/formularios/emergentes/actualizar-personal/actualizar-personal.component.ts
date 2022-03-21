import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Personal } from 'src/app/interfaces/login.interface';
import { RegistroPersonal } from 'src/app/interfaces/personal.interface';
import { DetallePorRol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-actualizar-personal',
  templateUrl: './actualizar-personal.component.html',
  styleUrls: ['./actualizar-personal.component.css']
})
export class ActualizarPersonalComponent implements OnInit {

  form!: FormGroup;
  errores!:[{msg:string}]
  existeError:boolean = false;
  msgExito:string = "";
  existeMsgExito:boolean = false;
  roles:DetallePorRol[] = [];
  @Input() personal!:Personal
  @Input() idPersonal:any = ""

  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() personalActualizado:EventEmitter<Personal[]> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.FormularioPersonal();
      this.obtenerRoles();
  }

  FormularioPersonal(){

    this.form =   this.fb.group({
      nombre:[this.personal.nombre , Validators.required],
      telefono:[this.personal.telefono, [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)] ],
      rol:[this.personal.rol._id, Validators.required],
    })
  }
  obtenerRoles(){
    this.QRUDService.ObtenerRegistros('rol').then((data:any) => {
      this.roles = data.roles
      console.log(this.roles)
    }).catch(err =>{
      if(err.error.msgtk){
       this.authService.logout();
      }
    })
  }

  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {nombre,rol,telefono}:RegistroPersonal = this.form.value;
    
    const personalActualizado = {
      nombre: nombre.trim().toLowerCase(),
      rol,
      telefono
    }


    this.QRUDService.ActualizarRegistros("personal",this.idPersonal,personalActualizado).then((data:any) => {
      console.log(data);
      this.msgExito ="Personal Actualizado Exitosamente";
      this.existeMsgExito = true;
      this.form.reset();

 
        this.personalActualizado.emit(data);
        this.ocultar.emit(false);

      setTimeout(() =>{
        this.existeMsgExito = false;
      },2000);


    }).catch(err => {
      console.log(err)
      this.existeError = true
      this.errores = err.error.errors

      if(err.error.msgtk){
        this.authService.logout();
      }
      
    })
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  removerAlertas(){
    this.existeError = false;
  }
ocultarFormulario(){
  this.ocultar.emit(false);
}


}
