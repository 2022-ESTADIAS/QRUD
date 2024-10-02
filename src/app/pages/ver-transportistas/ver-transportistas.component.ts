import { Component, OnInit } from '@angular/core';
import {
  Driver,
  DriverSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { VisitorsService } from 'src/app/services/visitors.service';
import html2PDF from 'jspdf-html2canvas';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-transportistas',
  templateUrl: './ver-transportistas.component.html',
  styleUrls: ['./ver-transportistas.component.css'],
})
export class VerTransportistasComponent implements OnInit {
  usuarios: Driver[] = [];
  page: number = 1;
  pages: number = 1;
  busqueda: string = '';
  ocultarPaginacion: boolean = true;
  showSpinner: boolean = true;
  msgQR: string = '';
  existeMsgQRExito: boolean = false;
  waitForAnswer: boolean = false;

  constructor(
    private VisitorsService: VisitorsService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService,
    private QRUDService: QRUDService,
    public translateHelper: DynamicTranslationsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getDrivers({
      page: this.page,
    });
  }

  getDrivers(opt: DriverSearchParams) {
    this.showSpinner = true;
    this.VisitorsService.getAllDrivers({
      page: opt.page,
      keyword: opt.keyword,
    })
      .then((data) => {
        this.usuarios = data.drivers;
        if (data.pages == 0 && data.drivers.length == 0) {
          this.page = 0;
        } else {
          this.page = data.page;
        }
        this.pages = data.pages;

        this.showSpinner = false;
      })
      .catch((err) => {
        if (err.error.msgtk) {
          this.AuthService.logout();
          return;
        }
        this.ErrorServidor.error();
      });
  }

  enviarQR(id: any) {
    this.waitForAnswer = true;
    this.QRUDService.GenerarQRUSuario(id)
      .then((data: any) => {
        this.existeMsgQRExito = true;
        this.msgQR = data.msg;
        this.waitForAnswer = false;
        setTimeout(() => {
          this.existeMsgQRExito = false;
        }, 2000);
      })
      .catch((err) => {
        if (err.error.msg) {
          this.msgQR = err.error.msg;
          // this.existeQRregistrado = true;

          setTimeout(() => {
            // this.existeQRregistrado = false;
          }, 2000);
          return;
        }
        if (err.error.msgtk) {
          this.AuthService.logout();
          return;
        }
        this.ErrorServidor.error();
      });
  }

  nextPage() {
    this.getDrivers({
      page: this.page + 1,
    });
  }
  prevPage() {
    this.getDrivers({
      page: this.page - 1,
    });
  }
  search(searchParam: string) {
    this.getDrivers({
      keyword: searchParam,
    });
  }
  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }

  downloadPDF(user: Driver) {
    const isCreated = this.generatePDFTemplate(user);

    if (isCreated) {
      const page = document.querySelector('#page') as HTMLElement;
      console.log(page, 'pagina');

      html2PDF(page, {
        jsPDF: {
          format: 'a4',
        },
        imageType: 'image/jpeg',
        output: './pdf/generate.pdf',
        margin: {
          top: 20,
          left: 10,
          bottom: 10,
          right: 10,
        },
        // html2canvas: {
        //   scrollX: 0,
        //   scrollY: -window.scrollY,
        // },
      });
    }
  }

  generatePDFTemplate(usuario: Driver): boolean {
    const div = document.querySelector('#table') as HTMLElement;
    const signature = document.querySelector(
      '#signature-container'
    ) as HTMLElement;

    const dynamicContent = `
    


        <p class="formatField">nombre del transportista: <span>${usuario.operator_name}</span> </p>
    <p class="formatField">Compañia: <span>${usuario.company_name}</span> </p>
    <p class="formatField">Telefono: <span>${usuario.phone}</span> </p>
    <p class="formatField">Email: <span>${usuario.email}</span> </p>
    <p class="formatField">Oficina: <span>${usuario.office_name}</span> </p>
    <p class="formatField">Telefono de oficina: <span>${usuario.office_phone}</span> </p>
    <p class="formatField">Numero economico: <span>1234567891</span></p>
    <p class="formatField">Placas del camion: <span>ASE1W-1ASD</span> </p>

  
    `;

    signature.innerHTML = `
      <div class="signature-placeholder"></div>
            <p class="signature-name">Personal Autorizado MEXCAL </p>
    `;

    div.innerHTML = dynamicContent;
    return true;
  }
}
