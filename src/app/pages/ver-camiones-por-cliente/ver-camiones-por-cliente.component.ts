import { Component, OnInit } from '@angular/core';
import html2PDF from 'jspdf-html2canvas';
import {
  SearchParams,
  Truck,
} from 'src/app/interfaces/mexcal/trucks.interface';
import {
  DriverResponse,
  TruckDriver,
  TruckDriverSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { TruckService } from 'src/app/services/truck.service';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'app-ver-camiones-por-cliente',
  templateUrl: './ver-camiones-por-cliente.component.html',
  styleUrls: ['./ver-camiones-por-cliente.component.css'],
})
export class VerCamionesPorClienteComponent implements OnInit {
  usuarios: DriverResponse[] = [];
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
    private TrucksService: TruckService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService,
    public translateHelper: DynamicTranslationsService
  ) {}

  ngOnInit(): void {
    this.getVisitors({
      page: this.page,
    });
  }

  getVisitors(opt: SearchParams) {
    this.showSpinner = true;
    this.VisitorsService.getAllTrucks({
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

  downloadPDF(user: Truck) {
    const isCreated = this.generatePDFTemplate(user);
    if (isCreated) {
      const page = document.querySelector('#page') as HTMLElement;

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

  generatePDFTemplate(usuario: Truck): boolean {
    const div = document.querySelector('#table') as HTMLElement;
    const signature = document.querySelector(
      '#signature-container'
    ) as HTMLElement;

    const dynamicContent = `
       <p class="formatField">Nombre: <span>${usuario.name}</span> </p>
    <p class="formatField">Compañia: <span>${usuario.company}</span> </p>
    <p class="formatField">Modelo: <span>${usuario.model}</span> </p>
    <p class="formatField">Marca: <span>${usuario.brand}</span> </p>
    <p class="formatField">Tracto: <span>${usuario.tract}</span> </p>
    <p class="formatField">VIN: <span>${usuario.vin}</span> </p>
    <p class="formatField">Año: <span>${usuario.year}</span></p>
   

  
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
