import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Usuario } from 'src/app/interfaces/usuario.interface';

/**
 * @ignore
 */
@Component({
  selector: 'app-escanner-usuario',
  templateUrl: './escanner-usuario.component.html',
  styleUrls: ['./escanner-usuario.component.css'],
  /* encapsulation:ViewEncapsulation.None */
})
export class EscannerUsuarioComponent implements OnInit {

  Tiempo:any
  Saludo:any
  constructor() { }

  scaneoCompletado:boolean = false;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX  ];
  usuarioQR!:Usuario;

  ngOnInit(): void {
    this.Tiempo = new Date().toLocaleString().split(",")[1].split(":")[0]
    
    if(this.Tiempo >= 0 && this.Tiempo <= 11){
      this.Saludo = "Buenos dias" 
    }else if(this.Tiempo >= 12 && this.Tiempo <= 19){
      this.Saludo = "Buenas tardes"
    }else {
      this.Saludo = "Buenas noches"
    }

  }

  escanearQR(event:any){
    const user = JSON.parse(event);
    this.usuarioQR = user;

    this.scaneoCompletado = true;
  }
  
  nuevoEscaneo(){
    this.scaneoCompletado = false;
    this.usuarioQR = {} as any;
    
  }

}
