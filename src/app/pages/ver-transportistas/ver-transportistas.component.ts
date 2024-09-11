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
    public translateHelper: DynamicTranslationsService
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
}
