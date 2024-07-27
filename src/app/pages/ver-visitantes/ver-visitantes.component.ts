import { Component, OnInit } from '@angular/core';
import {
  Visitor,
  VisitorSearchParams,
} from 'src/app/interfaces/mexcal/visitors.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { VisitorsService } from 'src/app/services/visitors.service';

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

  constructor(
    private VisitorsService: VisitorsService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService
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
        console.log(data, 'visitantes');
        this.usuarios = data.visitors;
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
}
