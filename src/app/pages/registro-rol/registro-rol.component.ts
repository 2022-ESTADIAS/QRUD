import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroRol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-registro-rol',
  templateUrl: './registro-rol.component.html',
  styleUrls: ['./registro-rol.component.css']
})
export class RegistroRolComponent implements OnInit {


  form!: FormGroup;
  existeError: boolean = false;
  errores!:[{msg:string}]
  msgExito:string = "";
  existeMsgExito:boolean = false;
  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }
  ngOnInit(): void {
    this.FormularioRol();
  }

  FormularioRol(){

    this.form =   this.fb.group({
      rol:["", Validators.required],
      description:["rol", Validators.required],
  
    })

  }

  submit(){

    
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const {description,rol:rolActual }:RegistroRol = this.form.value;
    
      const rol ={
        rol:rolActual.toLowerCase().trim(),
        description: description.trim().toLowerCase(),
      }

    this.QRUDService.crearRegistro("rol",rol).then((data:any) => {
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
