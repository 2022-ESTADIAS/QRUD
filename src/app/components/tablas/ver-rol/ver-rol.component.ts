import { Component, OnInit } from '@angular/core';
import { DetallePorRol } from 'src/app/interfaces/rol.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-ver-rol',
  templateUrl: './ver-rol.component.html',
  styleUrls: ['./ver-rol.component.css']
})
export class VerRolComponent implements OnInit {

  roles:DetallePorRol[] = [];

  constructor(
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.obtenerPersonal();
  }



  obtenerPersonal() {

    this.QRUDService.ObtenerRegistros("rol").then((data:any) => {
      console.log(data)
      this.roles = data.roles;
    })

  }

}
