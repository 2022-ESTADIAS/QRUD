import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { RegistroUsuario, Usuario } from 'src/app/interfaces/usuario.interface';
@Component({
  selector: 'app-escanner-qr',
  templateUrl: './escanner-qr.component.html',
  styleUrls: ['./escanner-qr.component.css']
})
export class EscannerQRComponent implements OnInit {

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  usuarioQR!:Usuario;
  ocultarFormulario: boolean = false;

  form!: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  
  FormularioUsuario(){

    this.form =   this.fb.group({
      nombre:[this.usuarioQR.nombre, Validators.required], 
      rfc:[this.usuarioQR.rfc, [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
      telefono:[this.usuarioQR.telefono,  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
      direccion:[this.usuarioQR.direccion, Validators.required],
      email:[this.usuarioQR.email,[Validators.required,Validators.email]],
    })

  }


  escanearQR(event:any){
    const user = JSON.parse(event);
    this.usuarioQR = user.usuario;
    if(user){
      this.ocultarFormulario = true;
    }
    
    if(this.usuarioQR && this.ocultarFormulario){
    this.FormularioUsuario();

    }
    console.log(this.usuarioQR)

    // console.log(user.usuario.nombre,"data parseada")
  }

  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }

  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const usuarioActualizado:RegistroUsuario = this.form.value;


  }

}
