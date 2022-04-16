import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-restablecer-contrasena-email',
  templateUrl: './restablecer-contrasena-email.component.html',
  styleUrls: ['./restablecer-contrasena-email.component.css']
})
export class RestablecerContrasenaEmailComponent implements OnInit {

  form!: FormGroup;
  existeError: boolean = false;
  msgError: string ='';

  msgExito:string = "";
  existemsgExito:boolean = false;

  private token:any;
  private id:any;
  
  constructor(
    private QRUDService: QRUDService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ErrorServidor:ErrorServidorService

  ) { }

  ngOnInit(): void {
  this.cambiarContrasena()
  this.route.queryParams.subscribe((data:any) =>{
    this.token = data.token;
    this.id = data.id;
  })
  
}

  cambiarContrasena(){
    this.form = this.fb.group({
      newpwd:["",[Validators.required,Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)  ]],
      again:["",[Validators.required]]
    },{validators:this.passwordsIguales("newpwd","again")})
  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const actualizarContrasena = this.form.value;

    this.QRUDService.restablecerContrasenaCorreo(actualizarContrasena,this.id,this.token).then((data:any) => {
      this.msgExito = data.msg
      this.form.reset();
      this.existemsgExito = true;

      setTimeout(() => {
        this.existemsgExito = false;
        this.router.navigateByUrl("/login")
      },1500)

    }).catch(err => {
       
        if(err.error.err){
          this.msgError = err.error.err; 
          this.existeError = true;
          setTimeout(() =>{
            this.existeError = false;
          },1500)
          return;
        }

        this.ErrorServidor.error();


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
