import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { RegistroUsuario, Usuario } from 'src/app/interfaces/usuario.interface';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-escanner-qr',
  templateUrl: './escanner-qr.component.html',
  styleUrls: ['./escanner-qr.component.css']
})
export class EscannerQRComponent implements OnInit {

  /**
   * formatos de codigo qr permitidos en las opciones del componente para  identificar el formato correcto  de  codigo qr escaneado
   */
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  /**
   * objeto que contiene los datos del usuario escaneado por el qr
   */
  usuarioQR!:Usuario;
  /**
   * propiedad que se encarga de mostrar/ocultar el formulario reactivo 
   */
  ocultarFormulario: boolean = false;
  /**
   * propiedad que se encarga de indicar si se encontro una camara en el dispositivo
   */
  camara:boolean = true;

  /**
   * propiedad que contiene el formulario reactivo
   */
  form!: FormGroup;

  /**
   * inyectando servicio de formulario reactivo
   */
  constructor(private fb:FormBuilder) { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * inicializando el formulario reactivo y mapeando los campos del formulario con los campos del usuario escaneado por el qr
   */
  FormularioUsuario(){

    this.form =   this.fb.group({
      nombre:[this.usuarioQR.nombre, Validators.required], 
      rfc:[this.usuarioQR.rfc, [Validators.required,Validators.pattern(/^[ña-z]{3,4}[0-9]{6}[0-9a-z]{3}$/i)]],
      telefono:[this.usuarioQR.telefono,  [Validators.required,Validators.pattern(/^[0-9]\d{9}$/g)]  ],
      direccion:[this.usuarioQR.direccion, Validators.required],
      email:[this.usuarioQR.email,[Validators.required,Validators.email]],
    })

  }

  /**
   * metodo que se dispara cuando se escanea un codigo qr
   * @param event como valor del evento recibe la informacion del usuario contenido en el codigo qr
   */
  escanearQR(event:any){
    const user = JSON.parse(event);
    this.usuarioQR = user;
    if(user){
      this.ocultarFormulario = true;
    }
    
    if(this.usuarioQR && this.ocultarFormulario){
    this.FormularioUsuario();

    }
  }

      /**
   * valida campos vacios del formulario reactivo si existen retorna un valor booleano true
   * @param campo recibe un campo del formulario para validar si contiene errores de validacion o no
   */
  campoValido(campo:string){
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched ;
  }
  /**
   * metodo que se dispara cuando se da click en el boton de facturar, lo que simula el proceso de facturacion utilizando los datos del usuario escaneado por el qr
   */
  submit(){

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const usuario:RegistroUsuario = this.form.value;
  }
  /**
   * metodo que se dispara cuando no se encuentra la camara disponible en el dispositivo
   */
  camaranoEncontrada(e:any){
    this.camara = false;
 
  }


}
