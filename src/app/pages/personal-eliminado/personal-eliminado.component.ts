import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/interfaces/personal.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-personal-eliminado',
  templateUrl: './personal-eliminado.component.html',
  styleUrls: ['./personal-eliminado.component.css']
})
export class PersonalEliminadoComponent implements OnInit {

  /**
   * recibe el personal que se encuentra inactivo
   */
  personas:Personal [] = [];
  /**
   * propiedad que permite mostrar el mensaje de exito solo si el personal se elimino/activo correctamente
   */
  existeMsgExito:boolean = false;
  /**
   * almacena la referencia del personal que se desea activa/eliminar permanentemente de la aplicación
   */
  personalActual:any= {};
  /**
   * propiedad que permite controlar la paginacion de los registros
   */
  page:any = 0;
  /**
   * propiedad que almacena la busqueda del personal
   */
  busqueda:any = "";
  /**
   * propiedad que permite controlar el momento en el que se debe ocultar/mostrar la paginacion
   */
  ocultarPaginacion:any = true; 

  /**
   * propiedad que permite controlar el mensaje que se muestra cuando no existen registros 
   */
  noexistePersonal:boolean = false;
  /**
   * inyeccion de dependencia de los servicios
   */
  constructor(
    private QRUDService:QRUDService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
    ) { }
  
  /**
   * metodo que se ejecuta al iniciar el componente obteniendo todo el personal inactivo
   */
  ngOnInit(): void { 
    this.obtenerPersonalEliminado();
  }
    /**
     * metodo que obtiene el personal inactivo 
     */
  obtenerPersonalEliminado(){
    this.QRUDService.VerEliminados("personal").then((data:any)=>{
      this.personas = data.eliminados;
      if(this.personas.length == 0){
        this.noexistePersonal =true;
      } 
    }).catch(err =>{
      if(err.error.msgtk){
        this.AuthService.logout();
        return;
      }
      this.ErrorServidor.error();
      
    })
  }
  /**
   * metodo que activa al personal seleccionado
   * @param id id del personal para restaurar su cuenta en la aplicacion
   */
  activarUsuario(id:any){
    this.QRUDService.activarUsuarios("personal",id).then((data:any)=>{
      this.personas = this.personas.filter(personal => personal.uid !==id );
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
        return;
      }
      this.ErrorServidor.error();
    })
  } 
  /**
   * metodo que obtiene la referencia del personal que se desea eliminar/activar permanentemente 
   * @param personal referencia del personal para eliminar/activar permanentemente
   */
  referenciaUsuarioActual(personal:any){
    this.personalActual = personal;
  }
  /**
   * metodo que elimina definitivamente al personal de la aplicación
   * @param id id del personal para eliminar permanentemente
   */
  eliminarUsuarioPermanentemente(id:any){
    this.QRUDService.EliminarRegistrosPermanentemente('personal',id).then((data) => {
      this.personas = this.personas.filter(personal => personal.uid !==id );
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
        return;
      }
      this.ErrorServidor.error();
    })
  }


}
