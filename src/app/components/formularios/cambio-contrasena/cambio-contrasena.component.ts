import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {
  form!: FormGroup;
  existeError: boolean = false;
  error:string = "";
  //actualizando contrasena exitosamente
  msgExito:string = "";
  existemsgExito:boolean = false;
  
  constructor(
    private QRUDService: QRUDService,
    private fb: FormBuilder,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
  this.cambiarContrasena()  



  }

  cambiarContrasena(){
    this.form = this.fb.group({
      lastpwd:["123456",[Validators.required,Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)]],
      newpwd:["",[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/g)]],
      newpwd2:["",[Validators.required]]
    },{validators:this.passwordsIguales("newpwd","newpwd2")})
  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const actualizarContrasena = this.form.value;

    this.QRUDService.cambiarContrasena(actualizarContrasena).then((data:any) => {
      this.msgExito = data.msg
      this.form.reset();
      this.existemsgExito = true;

      setTimeout(() => {
        this.existemsgExito = false;
      },1500)

    }).catch((err) => {

      console.log(err);
      this.error = err.error.msg;
      this.existeError = true;

      setTimeout(() => {
        this.existeError = false; 
      },1500)

      if(err.error.msgtk){
        this.authService.logout();
       }
    })

 

  }

  passwordsIguales(pass1:string,pass2:string){
    return (formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
  
      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsigual:true});
      }
    }
  }
  
  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }



  removerAlertas(){
    this.existeError = false;
  }

}