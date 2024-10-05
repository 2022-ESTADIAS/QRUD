import { Component, OnInit } from '@angular/core';
import {
  Visitor,
  VisitorSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { VisitorsService } from 'src/app/services/visitors.service';
import html2PDF from 'jspdf-html2canvas';

@Component({
  selector: 'app-ver-visitantes',
  templateUrl: './ver-visitantes.component.html',
  styleUrls: ['./ver-visitantes.component.css'],
})
export class VerVisitantesComponent implements OnInit {
  usuarios: Visitor[] = [];
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
    public translateHelper: DynamicTranslationsService
  ) {}

  ngOnInit(): void {
    this.getVisitors({
      page: this.page,
    });
  }

  getVisitors(opt: VisitorSearchParams) {
    this.showSpinner = true;
    this.VisitorsService.getAllVisitors({
      page: opt.page,
      keyword: opt.keyword,
    })
      .then((data) => {
        console.log(data, 'VISITANTES');

        this.usuarios = data.visitors;
        if (data.pages == 0 && data.visitors.length == 0) {
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
    this.getVisitors({
      page: this.page + 1,
    });
  }
  prevPage() {
    this.getVisitors({
      page: this.page - 1,
    });
  }
  search(searchParam: string) {
    this.getVisitors({
      keyword: searchParam,
    });
  }

  parseDate(fecha: string) {
    return fecha.replace('t', ' ');
  }
  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }

  downloadPDF(user: Visitor) {
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
      this.resetPDFTemplate();
    }
  }

  generatePDFTemplate(usuario: Visitor): boolean {
    const div = document.querySelector('#table') as HTMLElement;
    const signature = document.querySelector(
      '#signature-container'
    ) as HTMLElement;

    const dynamicContent = `
    


    <p class="formatField">${this.translateHelper.instantTranslation(
      'driverName'
    )}: <span>${usuario.name}</span> </p>
    <p class="formatField">${this.translateHelper.instantTranslation(
      'company'
    )}: <span>${usuario.visit_company}</span> </p>
    <p class="formatField">${this.translateHelper.instantTranslation(
      'email'
    )}: <span>${usuario.email}</span> </p>
    <p class="formatField">${this.translateHelper.instantTranslation(
      'phone'
    )}: <span>${usuario.phone}</span> </p>
    <p class="formatField">${this.translateHelper.instantTranslation(
      'licenseNumber'
    )}: <span>${usuario.license_number}</span></p>
    <p class="formatField">${this.translateHelper.instantTranslation(
      'licensePlates'
    )}: <span>${usuario.license_plates}</span> </p>

  
    `;

    signature.innerHTML = `
      <div class="signature-placeholder"></div>
            <p class="signature-name">${this.translateHelper.instantTranslation(
              'signaturePlaceholder'
            )} </p>
    `;

    div.innerHTML = dynamicContent;
    return true;
  }

  resetPDFTemplate() {
    const div = document.querySelector('#table') as HTMLElement;
    const signature = document.querySelector(
      '#signature-container'
    ) as HTMLElement;

    div.innerHTML = '';
    signature.innerHTML = '';
  }
}
