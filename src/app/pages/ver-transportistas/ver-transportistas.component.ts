import { Component, OnInit } from '@angular/core';
import {
  Driver,
  DriverSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
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

  constructor(
    private VisitorsService: VisitorsService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService
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
        console.log(data, 'DRIVERS');
        this.usuarios = data.drivers;
        this.page = data.page;
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
}
