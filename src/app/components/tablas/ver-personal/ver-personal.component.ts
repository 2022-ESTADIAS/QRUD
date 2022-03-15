import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/interfaces/personal.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-ver-personal',
  templateUrl: './ver-personal.component.html',
  styleUrls: ['./ver-personal.component.css']
})
export class VerPersonalComponent implements OnInit {

  personas:Personal[] = [];

  constructor(
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.obtenerPersonal();
  }



  obtenerPersonal() {

    this.QRUDService.ObtenerRegistros("personal").then((data:any) => {
      console.log(data)
      this.personas = data.personal;
    })

  }
}
