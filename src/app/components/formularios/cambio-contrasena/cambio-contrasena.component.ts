import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {
  form!: FormGroup;
  existeError: boolean = false;

  //actualizando contrasena exitosamente
  msgExito:string = "";
  existemsgExito:boolean = false;
  
  constructor(
    private QRUDService: QRUDService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  this.cambiarContrasena()  



  }

  cambiarContrasena(){
    this.form = this.fb.group({
      lastpwd:["123456",[Validators.required]],
      newpwd:["",[Validators.required]],
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
