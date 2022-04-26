import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroUsuario } from 'src/app/interfaces/usuario.interface';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-registro-publico',
  templateUrl: './registro-publico.component.html',
  styleUrls: ['./registro-publico.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RegistroPublicoComponent implements OnInit {

  form!: FormGroup;
  //arreglode errores provenientes del backend
  errores!:[{msg:string}]
  existeError:boolean = false;

  errorServidor:string ='';

  //se creo el usuario con exito
  msgExito:string = "";
  existeMsgExito:boolean = false;
  
  Tiempo:any
  Saludo:any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ErrorServidor:ErrorServidorService,
    private cliente: ClienteService
    
  ) { }

  ngOnInit(): void {
    this.FormularioUsuario();
    this.Tiempo = new Date().toLocaleString().split(",")[1].split(":")[0]
    /* this.Tiempo = 20 */
    if(this.Tiempo >= 0 && this.Tiempo <= 11){
      this.Saludo = "Buenos dias" 
    }else if(this.Tiempo >= 12 && this.Tiempo <= 19){
      this.Saludo = "Buenas tardes"
    }else {
      this.Saludo = "Buenas noches"
    }

    
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
    this.cliente.RegistrarUsuarioPublico(usuario).then((data:any)=>{
      console.log(data)
      this.msgExito = data.msg
      this.form.reset()
      this.existeMsgExito = true
      setTimeout(() => {
        this.existeMsgExito = false
      }, 2800);
      setTimeout(() => {
        this.router.navigateByUrl("/usuario/bienvenido")
      }, 3000);
      
    }).catch((error)=>{
      console.log(error)
      this.existeError = true
      this.errores = error.error.errors
    })
    

  /*   this.QRUDService.crearRegistro("user",usuario).then((data:any) => {
      console.log(data);
      this.msgExito = data.msg;
      this.existeMsgExito = true;
      this.form.reset();

      setTimeout(() =>{
        this.existeMsgExito = false;
      },2000);


    }).catch(err => {
      console.log(err)
      
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
    }) */
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  removerAlertas(){
    this.existeError = false;
  }


}
