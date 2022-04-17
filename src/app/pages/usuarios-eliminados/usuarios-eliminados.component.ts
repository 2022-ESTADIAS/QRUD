import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-usuarios-eliminados',
  templateUrl: './usuarios-eliminados.component.html',
  styleUrls: ['./usuarios-eliminados.component.css']
})
export class UsuariosEliminadosComponent implements OnInit {
  
  /**
   * recibe los usuarios que se encuentran inactivos
   */
  usuarios: Usuario[] = []
  
  /**
   * propiedad que permite mostrar el mensaje de exito solo si el usuario se elimino/activo correctamente
   */
  existeMsgExito:boolean = false;

  /**
   * almacena la referencia del usuario que se desea activa/eliminar permanentemente de la aplicación
   */
  usuarioActual:any= {};

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
  noexistenUsuarios:boolean = false;

  /**
   * inyeccion de dependencia de los servicios
   */
  constructor(
    private QRUDService:QRUDService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
    ) { }

  /**
   * metodo que se ejecuta al iniciar el componente obteniendo todos los usuarios inactivos
   */
  ngOnInit(): void {
    this.obtenerUsuariosEliminados();
  }

    /**
     * metodo que obtiene los usuarios inactivos
     */
  obtenerUsuariosEliminados(){
    this.QRUDService.VerEliminados("user").then((data:any)=>{
      this.usuarios = data.usuarios;

      if(this.usuarios.length == 0){
        this.noexistenUsuarios =true;
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
   * @param id id del usuario para restaurar su cuenta en la aplicacion
   */
  activarUsuario(id:any){
    this.QRUDService.activarUsuarios("user",id).then((data:any)=>{
      this.usuarios = this.usuarios.filter(usuario => usuario.uid !==id );
      this.existeMsgExito = true;

      setTimeout(() => {
        this.existeMsgExito = false;

        if(this.usuarios.length == 0){
          this.noexistenUsuarios =true;
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
   * metodo que obtiene la referencia del usuario que se desea eliminar/activar permanentemente 
   * @param usuario referencia del usuario para eliminar/activar permanentemente
   */
  referenciaUsuarioActual(usuario:any){
      this.usuarioActual = usuario;
  }
  /**
   * metodo que elimina definitivamente al usuario de la aplicación
   * @param id id del usuario para eliminar permanentemente
   */
  eliminarUsuarioPermanentemente(id:any){
    this.QRUDService.EliminarRegistrosPermanentemente('user',id).then((data) => {
      this.usuarios = this.usuarios.filter(usuario => usuario.uid !==id );



      this.existeMsgExito = true;

      setTimeout(() => {
        this.existeMsgExito = false;

        if(this.usuarios.length == 0){
          this.noexistenUsuarios =true;
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
