import { Component, OnInit } from '@angular/core';
import html2PDF from 'jspdf-html2canvas';
import {
  SearchParams,
  Truck,
} from 'src/app/interfaces/mexcal/trucks.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-registro-camion',
  templateUrl: './registro-camion.component.html',
  styleUrls: ['./registro-camion.component.css'],
})
export class RegistroCamionComponent implements OnInit {
  page: number = 1;
  pages: number = 1;
  busqueda: string = '';
  showSpinner: boolean = true;
  existeMsgQRExito: boolean = false;
  waitForAnswer: boolean = false;
  msg: string = '';

  trucks: Truck[] = [];

  constructor(
    public translateHelper: DynamicTranslationsService,
    private TruckService: TruckService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService
  ) {}

  ngOnInit(): void {
    this.getTrucks({
      page: this.page,
    });
  }

  nextPage() {
    this.getTrucks({
      page: this.page + 1,
    });
  }
  prevPage() {
    this.getTrucks({
      page: this.page - 1,
    });
  }
  search(searchParam: string) {
    this.getTrucks({
      keyword: searchParam,
    });
  }

  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
  getTrucks(opt: SearchParams) {
    this.showSpinner = true;

    this.TruckService.getAllTrucks({
      page: opt.page,
      keyword: opt.keyword,
    })
      .then((data) => {
        this.trucks = data.trucks;
        if (data.pages == 0 && data.trucks.length == 0) {
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
    this.TruckService.generateTruckQR(id)
      .then((data: any) => {
        this.existeMsgQRExito = true;
        this.msg = data.msg;
        this.waitForAnswer = false;
        setTimeout(() => {
          this.existeMsgQRExito = false;
        }, 2000);
      })
      .catch((err) => {
        if (err.error.msg) {
          this.msg = err.error.msg;
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
}
