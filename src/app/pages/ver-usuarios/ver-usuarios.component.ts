import { Component, OnInit } from '@angular/core';
import {  Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  /**
   * almacena todos los registros de los usuarios activo
   */
  usuarios:Usuario[] = [];

 /**
   * propiedad que muestra el mensaje de exito solo si la accion de eliminar se realizo con exito
   */
  existeMsgExito:boolean = false;
     /**
   * propiedad que muestra el mensaje de exito solo si la accion de actualizar se realizo con exito
   */
  existeMsgActualizarExito:boolean = false;

     /**
   * propiedad que muestra el mensaje de exito solo si la accion de generar el codigo QR se realizo con exito
   */
  existeMsgQRExito:boolean = false;

   /**
   * propiedad que muestra el mensaje de error solo si la accion de generar el codigo QR ya fue realizada
   */
  existeQRregistrado:boolean = false;

    /**
   * propiedad que restringe el acceso a ciertas acciones que esten delimitadas por el rol del personal logueado
   */
  accesoDenegado:boolean = true;

  /**
   * propiedad que guarda el mensaje de exito ´proveido por el backend solo si la accion de generar codigo QR se realizo con exito
   */
  msgQR:string = "";

    /**
   * propiedad que muestra el formulario emergente para actualizar el usuario
   */
  mostrarFormularioEmergente:any = false;

    /**
   * propiedad que almacena la referencia del usuario que se va actualizar
   */
  usuarioparaActualizar:any = {};
    /**
   * propiedad que almacena el id del personal que se desea actualizar
   */
  idusuarioActualizar:any = "";

    /**
   * propiedad que controla la pagina actual del registro
   */
  page:any = 0;
  
  /**
   * almacena la busqueda realizada por el personal
   */
  busqueda:any = "";

   /**
   * propieda que controla el momento para mostrar la paginacion 
   */
  ocultarPaginacion:any = true;
   /**
   * propiedad que almacena la referencia del usuario
   */
  usuarioActual: any;
  /**
   * propeidad que controla el momento para mostrar el mensaje de no encontrado cuando la busqueda no arroja resultados
  */
  noexistenUsuarios:boolean = false;

    /**
   * inyeccion de servicios
   */
  constructor(
    private QRUDService: QRUDService,
    private StorageService: StorageService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }

    /**
   * metodo que se ejecuta al iniciar el componente el cual obtiene todos los registros de los usuarios activos y verifica el rol del personal logueado
   */
  ngOnInit(): void {
    this.restriccionPorRol();
    this.obtenerUsuarios(); 
  }


    /**
   * metodo que obtiene todos los registros de los usuarios activos
   */
  obtenerUsuarios() {

    this.QRUDService.ObtenerRegistros("user").then((data:any) => {
      this.usuarios = data.usuarios;
      if(this.usuarios.length == 0){
        this.noexistenUsuarios =true;
      }
    }).catch(err =>{
      if(err.error.msgtk){
        this.AuthService.logout()
        return;
      }
      this.ErrorServidor.error();

    })
 
  }
    /**
     * metodo que guarda la referencia del usuario que se desea eliminar
     */
  referenciaUsuarioActual(usuario:any){
    this.usuarioActual = usuario;
}

    /**
   * metodo que elimina el registro del usuario
   */
  eliminarUsuario(id:any) {
    this.QRUDService.EliminarRegistros("user",id).then((data:any) =>{
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
        this.AuthService.logout()
        return;
      }
      this.ErrorServidor.error();
    })
  }
  /**
 *  metodo que muestra el formulario emergente para actualizar el usuario y  guarda la referencia del usuario que se desea actualizar
 */
  actualizarUsuario(id:any,usuario:any){
    this.mostrarFormularioEmergente = true;
    this.idusuarioActualizar = id; 
    this.usuarioparaActualizar = usuario;
 
  }
    /**
   * metodo que actualiza el registro del usuario
   */
  actualizandoArregloUsuario(data:any){
    this.usuarios= this.usuarios.map(usuario => {
      if(usuario.uid == data.uid){
          usuario = data
          return usuario
      }else return usuario;
    })
    this.existeMsgActualizarExito = true;

    setTimeout(() =>{
      this.existeMsgActualizarExito = false;
    },2000);

  }
  /**
   * metodo que genera el codigo QR del usuario
   */
  enviarQR(id:any){
    this.QRUDService.GenerarQRUSuario(id).then((data:any) =>{

      this.existeMsgQRExito = true;
      this.msgQR = data.msg;

      setTimeout(() =>{
        this.existeMsgQRExito = false;
      },2000);
  

    }).catch(err => {
      if(err.error.msg){
        this.msgQR = err.error.msg;
        this.existeQRregistrado = true;
  
        setTimeout(() =>{
          this.existeQRregistrado = false;
        },2000)
        return;
      }
        if(err.error.msgtk){
          this.AuthService.logout()
          return;
        }
        this.ErrorServidor.error();
    })

  }
/**
 * metodo que verifica la el rol del personal logueado para restringir el acceso a ciertas acciones
 */
 restriccionPorRol(){
    const rol = this.StorageService.desencriptar("rol");

    if(rol == "AUX_ROLE"){
      this.accesoDenegado = false;
    }

  }
}
