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

  existeMsgExito:boolean = false;

  existeMsgActualizarExito:boolean = false;
  mostrarFormularioEmergente:boolean = false;
  rolparaActualizar:any = {};
  idrolActualizar:any = "";

  constructor(
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }



  obtenerRoles() {

    this.QRUDService.ObtenerRegistros("rol").then((data:any) => {
      console.log(data)
      this.roles = data.roles;
    })

  }


  actualizarRoles(id:any,rol:any){
    this.mostrarFormularioEmergente = true;
    this.idrolActualizar = id; 
    this.rolparaActualizar = rol;
 
  }
  actualizandoArregloRoles(data:any){
    this.roles= this.roles.map(rol => {
      if(rol._id == data._id){
          rol = data
          return rol
      }else return rol;
    })
    this.existeMsgActualizarExito = true;

    setTimeout(() =>{
      this.existeMsgActualizarExito = false;
    },2000);

  }



}
