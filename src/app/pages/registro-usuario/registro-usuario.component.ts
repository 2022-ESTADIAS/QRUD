import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroUsuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  form!: FormGroup;
  //arreglode errores provenientes del backend
  errores!:[{msg:string}]
  existeError:boolean = false;

  errorServidor:string ='';

  //se creo el usuario con exito
  msgExito:string = "";
  existeMsgExito:boolean = false;

  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private router: Router,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }

  ngOnInit(): void {
    this.FormularioUsuario();
    
  }

  FormularioUsuario(){

    this.form =   this.fb.group({
      nombre:["", Validators.required], 
      rfc:["", [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
      telefono:["",  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
      direccion:["", Validators.required],
      email:["",[Validators.required,Validators.email]],
    })

  }

  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {email,direccion,nombre,rfc,telefono }:RegistroUsuario = this.form.value;
    
    const usuario:RegistroUsuario = {
      email: email.trim().toLowerCase(),
      direccion: direccion.trim().toLowerCase(),
      nombre: nombre.trim().toLowerCase(),
      rfc: rfc.trim().toLowerCase(),
      telefono,
    };
    
    

    this.QRUDService.crearRegistro("user",usuario).then((data:any) => {
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

      if(err.error.err){
        this.errorServidor = err.error?.err
        return;

      }

        if(err.error.msgtk){
            this.AuthService.logout();
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
