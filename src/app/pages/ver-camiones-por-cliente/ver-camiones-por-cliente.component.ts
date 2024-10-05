import { Component, OnInit } from '@angular/core';
import html2PDF from 'jspdf-html2canvas';
import {
  TruckDriver,
  TruckDriverSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'app-ver-camiones-por-cliente',
  templateUrl: './ver-camiones-por-cliente.component.html',
  styleUrls: ['./ver-camiones-por-cliente.component.css'],
})
export class VerCamionesPorClienteComponent implements OnInit {
  usuarios: TruckDriver[] = [];
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
    public translateHelper: DynamicTranslationsService
  ) {}

  ngOnInit(): void {
    this.getVisitors({
      page: this.page,
    });
  }

  getVisitors(opt: TruckDriverSearchParams) {
    this.showSpinner = true;
    this.VisitorsService.getAllTrucks({
      page: opt.page,
      keyword: opt.keyword,
    })
      .then((data) => {
        console.log(data, 'VISITANTES');

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

  downloadPDF(user: TruckDriver) {
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

  generatePDFTemplate(usuario: TruckDriver): boolean {
    const div = document.querySelector('#table') as HTMLElement;
    const signature = document.querySelector(
      '#signature-container'
    ) as HTMLElement;

    const dynamicContent = `
    


    <p class="formatField">nombre del transportista: <span>${usuario?.visitor_id?.name}</span> </p>
    <p class="formatField">Compañia: <span>${usuario.visitor_id?.visit_company}</span> </p>
    <p class="formatField">Email: <span>${usuario.visitor_id?.email}</span> </p>
    <p class="formatField">Telefono: <span>${usuario.visitor_id?.phone}</span> </p>
    <p class="formatField">Numero economico: <span>${usuario.visitor_id?.license_number}</span></p>
    <p class="formatField">Placas del camion: <span>${usuario.visitor_id?.license_plates}</span> </p>

  
    `;

    signature.innerHTML = `
      <div class="signature-placeholder"></div>
            <p class="signature-name">Personal Autorizado MEXCAL </p>
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
