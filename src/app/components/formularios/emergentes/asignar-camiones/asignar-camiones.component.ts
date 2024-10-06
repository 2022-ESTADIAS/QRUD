import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Visitor,
  VisitorSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'app-asignar-camiones',
  templateUrl: './asignar-camiones.component.html',
  styleUrls: ['./asignar-camiones.component.css'],
})
export class AsignarCamionesComponent implements OnInit {
  /**
   * evento que emite el valor para mostrar/ocultar el modal del formulario reactivo
   */
  @Output() ocultar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() idCliente: any = '';

  showSpinner: boolean = false;
  page: number = 0;
  pages: number = 0;

  drivers: Visitor[] = [];
  driversSelectionIds: string[] = [];

  existeError: boolean = false;
  errores!: [{ msg: string }];
  existeMsgExito: boolean = false;
  msgExito: string = '';

  constructor(
    private VisitorsService: VisitorsService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService,
    private translateHelper: DynamicTranslationsService
  ) {}

  ngOnInit(): void {
    this.getDrivers({});
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

  /**
   * metodo que oculta el modal del formulario reactivo
   */
  ocultarFormulario() {
    this.ocultar.emit(false);
  }

  getDrivers(opt: VisitorSearchParams) {
    this.showSpinner = true;
    this.VisitorsService.getAllVisitors({
      page: opt.page,
      keyword: opt.keyword,
    })
      .then((data) => {
        this.drivers = data.visitors;
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

  toggleDriver(id: string) {
    const findDriver = this.driversSelectionIds.find((item) => item == id);
    if (findDriver) {
      this.driversSelectionIds = this.driversSelectionIds.filter(
        (item) => item !== id
      );
    } else {
      this.driversSelectionIds.push(id);
    }
  }

  TrucksAssignation() {
    this.VisitorsService.AssignationTrucks(
      this.idCliente,
      this.driversSelectionIds
    )
      .then((data) => {
        this.msgExito = data.msg;
        this.existeMsgExito = true;

        setTimeout(() => {
          this.existeMsgExito = false;
          this.ocultarFormulario();
        }, 2000);
      })
      .catch((err) => {
        if (err.error.erros) {
          this.existeError = true;
          this.errores = err.error.errors;
          return;
        }

        if (err.error.msgtk) {
          this.AuthService.logout();
          return;
        }

        this.ErrorServidor.error();
      });
  }

  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
