import { Component, OnInit } from '@angular/core';
import { Usuario, UsuariosResponse } from 'src/app/interfaces/usuario.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  usuarios:any[] = [];

  constructor(
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }



  obtenerUsuarios() {

    this.QRUDService.ObtenerRegistros("user").then((data:any) => {
      console.log(data)
      this.usuarios = data.usuarios;
    })

  }

}
