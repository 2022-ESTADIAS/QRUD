import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroUsuario } from 'src/app/interfaces/usuario.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  form!: FormGroup;
  errores!:[{msg:string}]
  existeError:boolean = false;
  arregloPosicionesCSS = ["0px","200px","450px","630px"]

  constructor(
    private fb: FormBuilder,
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.FormularioUsuario();
    
    this.QRUDService.ObtenerRegistros("user").then((data) => {
      console.log(data)
    })
  }

  FormularioUsuario(){

    // this.form =   this.fb.group({
    //   nombre:["koso", Validators.required],
    //   rfc:["koso961023f12", [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
    //   telefono:["1234567891",  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
    //   direccion:["koso #23", Validators.required],
    //   email:["koso60@koso.com",[Validators.required,Validators.email]],
    // })

    this.form =   this.fb.group({
      nombre:["", Validators.required],
      rfc:["", [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
      telefono:["",  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
      direccion:["", Validators.required],
      email:["",[Validators.required,Validators.email]],
    })

  }

  submit(){

    // if(this.form.invalid){
    //   this.form.markAllAsTouched();
    //   return;
    // }

    const usuario:RegistroUsuario = this.form.value;

    this.QRUDService.crearRegistro("user",usuario).then((data) => {
      console.log(data);
    }).catch(err => {
      console.log(err)
      this.existeError = true
      this.errores = err.error.errors
      
    })
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }


}
