import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/interfaces/personal.interface';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ver-personal',
  templateUrl: './ver-personal.component.html',
  styleUrls: ['./ver-personal.component.css']
})
export class VerPersonalComponent implements OnInit {

  personas:Personal[] = [];
  existeMsgExito:boolean = false;

  existeMsgActualizarExito:boolean = false;
  mostrarFormularioEmergente:boolean = false;
  personalparaActualizar:any = {};
  idpersonalActualizar:any = "";

  accesoDenegado:boolean = true;


  page:number = 0;
  busqueda:string = "";
  ocultarPaginacion:boolean = true;

  personalActual:any;

  noexistePersonal:boolean = false;

  constructor(
    private QRUDService: QRUDService,
    private StorageService: StorageService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerPersonal();
    this.restriccionPorRol();
  }



  obtenerPersonal() {

    this.QRUDService.ObtenerRegistros("personal").then((data:any) => {
      console.log(data)
      this.personas = data.personal;

      if(this.personas.length == 0){
        this.noexistePersonal =true;
      } 

    }).catch(err =>{
      if(err.error.msgtk){
        this.AuthService.logout();
      }
    })

  }

  eliminarPersonal(id:any) {
    this.QRUDService.EliminarRegistros("personal",id).then((data:any) =>{
      this.personas = this.personas.filter(personal => personal.uid !==id );
      console.log(data);
      this.existeMsgExito = true;

      setTimeout(() => {
        this.existeMsgExito = false;

        if(this.personas.length == 0){
          this.noexistePersonal =true;
        } 
        }, 1500);
        
    }).catch(err =>{
      if(err.error.msgtk){
        this.AuthService.logout();
      }
    })
  }
  
  referenciaPersonalActual(personal:any){
    this.personalActual = personal;
}



  actualizarPersonal(id:any,personal:any){
    this.mostrarFormularioEmergente = true;
    this.idpersonalActualizar = id; 
    this.personalparaActualizar = personal;
 
  }
  actualizandoArregloPersonal(data:any){
    this.personas= this.personas.map(personal => {
      if(personal.uid == data.uid){
          personal = data
          return personal
      }else return personal;
    })
    this.existeMsgActualizarExito = true;

    setTimeout(() =>{
      this.existeMsgActualizarExito = false;
    },2000);

  }

  restriccionPorRol(){
    const rol = this.StorageService.desencriptar("rol");

    if(rol == "ADMIN_ROLE" || rol == "AUX_ROLE"){
      this.accesoDenegado = false;
    }

  }

} 
