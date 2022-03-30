import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetallePorRol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
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
    private QRUDService: QRUDService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }



  obtenerRoles() {

    this.QRUDService.ObtenerRegistros("rol").then((data:any) => {
      console.log(data)
      this.roles = data.roles;
    }).catch(err =>{
      if(err.error.msgtk){
       this.AuthService.logout();
       return;
      }
      this.ErrorServidor.error();
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
