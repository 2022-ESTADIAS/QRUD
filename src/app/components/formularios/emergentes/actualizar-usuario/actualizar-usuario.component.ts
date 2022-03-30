import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroUsuario, Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  form!: FormGroup;
  errores!:[{msg:string}]
  existeError:boolean = false;
  msgExito:string = "";
  existeMsgExito:boolean = false;
  @Input() usuario!:Usuario
  @Input() idUsuario:any = ""
  usuarios:Usuario[] = [];

  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() usuarioActualizado:EventEmitter<Usuario[]> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private authService: AuthService,
    private ErrorServidor:ErrorServidorService
    ) { }

  ngOnInit(): void {
    this.FormularioUsuario();
    
 
  }

  FormularioUsuario(){

    this.form =   this.fb.group({
      nombre:[this.usuario.nombre, Validators.required], 
      rfc:[this.usuario.rfc, [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
      telefono:[this.usuario.telefono,  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
      direccion:[this.usuario.direccion, Validators.required],
      email:[this.usuario.email,[Validators.required,Validators.email]],
    })

  }

  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {email,direccion,nombre,rfc,telefono }:RegistroUsuario = this.form.value;
    
    const usuarioActualizado:RegistroUsuario = {
      email: email.trim().toLowerCase(),
      direccion: direccion.trim().toLowerCase(),
      nombre: nombre.trim().toLowerCase(),
      rfc: rfc.trim().toLowerCase(),
      telefono,
    };

    console.log(this.idUsuario)
    this.QRUDService.ActualizarRegistros("user",this.idUsuario,usuarioActualizado).then((data:any) => {
      console.log(data);
      this.msgExito ="Usuario Actualizado Exitosamente";
      this.existeMsgExito = true;
      this.form.reset();

        this.usuarioActualizado.emit(data);
        this.ocultar.emit(false);

      setTimeout(() =>{
        this.existeMsgExito = false;
      },2000);


    }).catch(err => {
      console.log(err)
      if(err.error.errors){
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
