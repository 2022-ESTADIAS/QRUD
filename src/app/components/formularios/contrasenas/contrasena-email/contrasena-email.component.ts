import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-contrasena-email',
  templateUrl: './contrasena-email.component.html',
  styleUrls: ['./contrasena-email.component.css']
})
export class ContrasenaEmailComponent implements OnInit {

  form!: FormGroup;
  msgExito:string = "";
  msgError:string = "";
  existeError:boolean = false;
  existeMsgExito:boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private QRUDService: QRUDService,
    private ErrorServidor:ErrorServidorService
  ) { }

  ngOnInit(): void {
    this.restablecerContrasena();
  }

  restablecerContrasena(){
  this.form =   this.fb.group({
      email:["",Validators.required]
    });
  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value;
    
    this.QRUDService.olvideContrasena(email).then((data:any) => {
      console.log(data);
      this.msgExito = data.msg;
      this.form.reset();
      this.existeMsgExito = true;

  setTimeout(() => {
  this.existeMsgExito = false
  this.router.navigateByUrl("/login");
    },1500)

    }).catch((err) => {
      console.log(err);
      if(err.error.msg){
        this.existeError = true;
        this.msgError = err.error.msg;
        
        setTimeout(() => {
          this.existeError = false; 
  
        },1500)
        return;
      }

      this.ErrorServidor.error();

    })
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }


} 
