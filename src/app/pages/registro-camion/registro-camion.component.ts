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
import { format } from 'date-fns';

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
  camionActual: Truck | null = null;

  // EDIT TRUCK FUNCTIONALITY
  showEditModal: boolean = false;
  updateTruck: Truck | null = null;
  updateTruckId: string = '';

  // ADD TRUCK FUNCTIONALITY
  showAddModal: boolean = false;
  createTruck: Truck | null = null;

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
  actualizarCamion(id: string, truck: Truck) {
    this.updateTruck = truck;
    this.updateTruckId = id;
    this.showEditModal = true;
  }

  referenciaCamionActual(truck: Truck) {
    this.camionActual = truck;
  }
  eliminarCamion(id: string) {
    this.TruckService.deleteTruck(id)
      .then((data) => {
        this.msg = data.message;
        this.existeMsgQRExito = true;
        this.getTrucks({
          page: this.page,
        });

        setTimeout(() => {
          this.existeMsgQRExito = false;
        }, 2000);
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

  downloadPDF(id: string) {
    this.TruckService.getTruckByQR(id)
      .then((data) => {
        const isCreated = this.generatePDFTemplate(data.truck, data.qr);

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

  generatePDFTemplate(usuario: Truck, qr: string): boolean {
    const div = document.querySelector('#table') as HTMLElement;
    const signature = document.querySelector(
      '#signature-container'
    ) as HTMLElement;
    const qrImage = document.querySelector('#truck-qr') as HTMLElement;
    const date = document.querySelector('#date-container') as HTMLElement;

    date.innerHTML = `
      <p>Fecha: <span class=""> ${this.actualDate()}</span> </p>
    `;

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

    qrImage.innerHTML = `
     <img src="${qr}" class="qr-pdf-image" alt="qr image"

     ></img> 
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

  actualDate() {
    const today = new Date();
    const date = format(today, 'dd/MM/yyyy HH:mm');
    // const time = date.split(' ')[1];
    // const amOrPm = +time >= 12 ? 'pm' : 'am';

    return date;
  }

  addModal() {
    this.showAddModal = true;
  }

  handleSmgExito(msg: string) {
    this.msg = msg;
    this.existeMsgQRExito = true;

    setTimeout(() => {
      this.existeMsgQRExito = false;
    }, 2000);
  }
}
