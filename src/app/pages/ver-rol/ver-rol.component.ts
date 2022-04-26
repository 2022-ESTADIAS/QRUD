import { Component, OnInit } from '@angular/core';
import {  Rol } from 'src/app/interfaces/rol.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-ver-rol',
  templateUrl: './ver-rol.component.html',
  styleUrls: ['./ver-rol.component.css']
})
export class VerRolComponent implements OnInit {
    /**
   * almacena todos los registros de los roles
   */
  roles:Rol[] = []; 

   /**
   * propiedad que muestra el mensaje de exito solo si la accion de actualizar se realizo con exito
   */
  existeMsgActualizarExito:boolean = false;
  
  /**
   * propiedad que muestra el formulario emergente para actualizar el usuario
   */
  mostrarFormularioEmergente:any= false;

   /**
   * propiedad que almacena la referencia del rol que se va actualizar
   */
  rolparaActualizar:any = {};

    /**
   * propiedad que almacena el id del rol que se desea actualizar
   */
  idrolActualizar:any = "";

  /**
   * inyeccion de servicios
   */
  constructor(
    private QRUDService: QRUDService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }
    /**
     * metodo que se ejecuta al iniciar el componente obteniendo todos los roles de la base de datos
     */
  ngOnInit(): void {
    this.obtenerRoles();
  }


  /**
   * metodo que obtiene todos los roles de la base de datos
   */
  obtenerRoles() {

    this.QRUDService.ObtenerRegistros("rol").then((data:any) => {
      this.roles = data.roles;
    }).catch(err =>{
      if(err.error.msgtk){
       this.AuthService.logout();
       return;
      }
      this.ErrorServidor.error();
    })

  }

  /**
   * metodo que muestra el formulario emergente para actualizar el rol y almacena la referencia del rol que se desea actualizar
   */
  actualizarRoles(id:any,rol:any){
    this.mostrarFormularioEmergente = true;
    this.idrolActualizar = id; 
    this.rolparaActualizar = rol;
 
  }
  /**
   * metodo que actualiza el rol
   */
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
