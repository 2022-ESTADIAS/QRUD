import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarcodeFormat } from '@zxing/library';
import { QRCodeVisitor } from 'src/app/interfaces/mexcal/index.interface';
import { RegistroUsuario, Usuario } from 'src/app/interfaces/usuario.interface';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-escanner-qr',
  templateUrl: './escanner-qr.component.html',
  styleUrls: ['./escanner-qr.component.css'],
})
export class EscannerQRComponent implements OnInit {
  /**
   * formatos de codigo qr permitidos en las opciones del componente para  identificar el formato correcto  de  codigo qr escaneado
   */
  allowedFormats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];
  /**
   * objeto que contiene los datos del usuario escaneado por el qr
   */
  usuarioQR!: QRCodeVisitor | null;
  /**
   * propiedad que se encarga de mostrar/ocultar el formulario reactivo
   */
  ocultarDatos: boolean = false;
  /**
   * propiedad que se encarga de indicar si se encontro una camara en el dispositivo
   */
  camara: boolean = true;

  /**
   * inyectando servicio de formulario reactivo
   */
  constructor(private fb: FormBuilder, private QRUDService: QRUDService) {}

  /**
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * metodo que se dispara cuando se escanea un codigo qr
   * @param event como valor del evento recibe la informacion del usuario contenido en el codigo qr
   */
  escanearQR(event: any) {
    console.log(event, 'EVENTOS');
    const user = JSON.parse(event) as QRCodeVisitor;
    console.log(user, 'USERS');
    this.usuarioQR = user;
    this.ocultarDatos = true;

    if (this.usuarioQR) {
      const date = new Date().toLocaleString('es-MX');

      console.log(date, 'MOMENTO ACTUAL DEL ESCANEO');
      this.QRUDService.visitorsActiveVerification(this.usuarioQR._id)
        .then((data) => {
          if (data.access) {
            this.QRUDService.visitorsEntries({
              scanDate: date,
              visitorQr: this.usuarioQR!,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /**
   * metodo que se dispara cuando no se encuentra la camara disponible en el dispositivo
   */
  camaranoEncontrada(e: any) {
    this.camara = false;
  }

  limpiarQr() {
    this.usuarioQR = null;
  }
}
