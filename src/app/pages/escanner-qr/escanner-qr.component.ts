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
  constructor(private fb: FormBuilder, private QRUDService: QRUDService) {}

  /**
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * metodo que se dispara cuando se escanea un codigo qr
   * @param event como valor del evento recibe la informacion del usuario contenido en el codigo qr
   */
  escanearQR(event: string) {
    this.showQREscaner = false;
    const user = JSON.parse(event) as QRCodeVisitor;
    // console.log(user, 'escaner');
    this.QRUDService.getImageFromAWS(user._id)
      .then((data) => {
        this.usuarioQR = {
          ...user,
          ine_field: data.images.ine,
          driver_licence_field: data.images.license ? data.images.license : '',
        };
        this.showQREscaner = true;
      })
      .catch((err) => {
        this.showQREscaner = true;
        this.existeError = true;
        this.errorServidor = err.error.err;

        setTimeout(() => {
          this.existeError = false;
          this.errorServidor = '';
        }, 4000);
      });

    // this.usuarioQR = user;
    if (user.visitor_type) {
      this.ocultarDatos = true;
    } else {
      this.showDriver = true;
    }

    if (this.usuarioQR) {
      const date = new Date().toLocaleString('es-MX');

      this.QRUDService.visitorsActiveVerification(this.usuarioQR._id)
        .then((data) => {
          if (data.access) {
            this.QRUDService.visitorsEntries({
              scanDate: date,
              visitorQr: this.usuarioQR!,
            });
            this.existeMsgExito = true;
            this.msgExito = 'Accesso concedido !';

            setTimeout(() => {
              this.existeMsgExito = false;
            }, 4000);
          }
        })
        .catch((err) => {
          this.showQREscaner = true;
          this.existeError = true;
          this.errorServidor = err.error.err;

          setTimeout(() => {
            this.existeError = false;
            this.errorServidor = '';
          }, 4000);
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
    this.showDriver = false;
    this.ocultarDatos = false;
  }
  parseDate(fecha: string) {
    return fecha.replace('t', ' ');
  }
}
