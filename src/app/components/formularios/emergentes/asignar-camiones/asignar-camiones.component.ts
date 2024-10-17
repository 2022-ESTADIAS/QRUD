import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Truck } from 'src/app/interfaces/mexcal/trucks.interface';
import {
  TruckID,
  Visitor,
  VisitorSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { TruckService } from 'src/app/services/truck.service';
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

  drivers: Truck[] = [];
  driversSelectionIds: string[] = [];

  existeError: boolean = false;
  errores!: [{ msg: string }];
  existeMsgExito: boolean = false;
  msgExito: string = '';

  trucksAlreadySelected: TruckID[] = [];

  asignInMemory: boolean = false;

  constructor(
    private VisitorsService: VisitorsService,
    private TrucksService: TruckService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService,
    private translateHelper: DynamicTranslationsService
  ) {}

  ngOnInit(): void {
    this.getDrivers({});
    this.AssignedTrucks();
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
    this.TrucksService.getAllTrucks({
      page: opt.page,
      keyword: opt.keyword,
    })
      .then((data) => {
        console.log(data, 'TRUCKS');

        this.drivers = data.trucks;
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

  toggleDriver(id: string) {
    const checkBox = document.getElementById(id);
    checkBox?.classList.toggle('active');

    const findDriver = this.driversSelectionIds.find((item) => item == id);
    if (findDriver) {
      this.driversSelectionIds = this.driversSelectionIds.filter(
        (item) => item !== id
      );
    } else {
      this.driversSelectionIds.push(id);
    }

    // this.driversSelectionIds.push(id);
  }

  TrucksAssignation() {
    console.log(this.driversSelectionIds, 'DRIVERS');

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

  AssignedTrucks() {
    this.VisitorsService.trucksAlreadyAssigned(this.idCliente)
      .then((data) => {
        this.trucksAlreadySelected = data.trucks;
      })
      .catch((err) => {
        if (err.error.msgtk) {
          this.AuthService.logout();
          return;
        }
        this.ErrorServidor.error();
      });
  }

  isAssignedTruck(id: string) {
    const isAsssigned = this.trucksAlreadySelected.find(
      (item) => item.truck_id == id
    );
    const itemFound = this.driversSelectionIds.find(
      (item) => item.toString() == id.toString()
    );

    return isAsssigned || itemFound ? true : false;
  }
}
