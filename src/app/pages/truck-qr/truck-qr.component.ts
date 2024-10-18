import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { TruckService } from 'src/app/services/truck.service';
import { BarcodeFormat } from '@zxing/library';
import { Truck } from 'src/app/interfaces/mexcal/trucks.interface';

@Component({
  selector: 'app-truck-qr',
  templateUrl: './truck-qr.component.html',
  styleUrls: ['./truck-qr.component.css'],
})
export class TruckQrComponent implements OnInit {
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
  usuarioQR!: Truck | null;
  /**
   * propiedad que se encarga de mostrar/ocultar el formulario reactivo
   */
  mostrarDatos: boolean = false;
  showDriver: boolean = false;
  /**
   * propiedad que se encarga de indicar si se encontro una camara en el dispositivo
   */
  camara: boolean = true;
  showQREscaner: boolean = true;
  existeError: boolean = false;

  /**
   * propiedad que contiene un arreglo con los mensajes de error proveido por las validaciones del backend
   */
  errores!: [{ msg: string }];

  /**
   * almacena el mensaje de eror en caso de que el servidor no responda
   */
  errorServidor: string = '';

  /**
   * propiedad que muestra el mensaje de exito solo si el registro del usuario fue exitoso
   */
  existeMsgExito: boolean = false;

  /**
   * propiedad que contiene el mensaje de exito
   */
  msgExito: string = '';

  /**
   * inyectando servicio de formulario reactivo
   */
  constructor(
    private TruckService: TruckService,
    public translateHelper: DynamicTranslationsService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  escanearQR(event: string) {
    this.showQREscaner = false;
    // const user = JSON.parse(event) as QRCode;
    const userId = JSON.parse(event) as string;
    console.log(userId, 'escaner');
    this.TruckService.getTruckByQR(userId)
      .then((data) => {
        console.log(data, 'DATA');
        this.usuarioQR = data.truck;
        this.showQREscaner = true;
        this.mostrarDatos = true;

        this.existeMsgExito = true;
        this.msgExito = this.instantTranslation('qrAccessGranted');

        setTimeout(() => {
          this.existeMsgExito = false;
        }, 4000);
      })
      .catch((err) => {
        this.showQREscaner = true;
        this.existeError = true;
        // this.errorServidor = err.error.err;
        this.errorServidor = this.instantTranslation('invalidQRCode');
        this.usuarioQR = null;

        setTimeout(() => {
          this.existeError = false;
          this.errorServidor = '';
        }, 4000);
      });

    // this.usuarioQR = user;
  }

  /**
   * metodo que se dispara cuando no se encuentra la camara disponible en el dispositivo
   */
  camaranoEncontrada(e: any) {
    this.camara = false;
  }

  limpiarQr() {
    this.usuarioQR = null;
    this.mostrarDatos = false;
  }
  parseDate(fecha: string) {
    return fecha.replace('t', ' ');
  }
  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
