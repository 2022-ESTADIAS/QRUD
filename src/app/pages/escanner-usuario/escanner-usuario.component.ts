import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Usuario } from 'src/app/interfaces/usuario.interface';
@Component({
  selector: 'app-escanner-usuario',
  templateUrl: './escanner-usuario.component.html',
  styleUrls: ['./escanner-usuario.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class EscannerUsuarioComponent implements OnInit {

  constructor() { }

  scaneoCompletado:boolean = false;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  usuarioQR!:Usuario;

  ngOnInit(): void {

  }

  escanearQR(event:any){
    const user = JSON.parse(event);
    this.usuarioQR = user;

    this.scaneoCompletado = true;
  }
  
  nuevoEscaneo(){
    this.scaneoCompletado = false;
    this.usuarioQR = {};
    
  }

}
