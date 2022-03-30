import { Component, OnInit } from '@angular/core';
import { RegistroUsuario, Usuario, UsuariosResponse } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  usuarios:Usuario[] = [];

  //banderas para mostrar los errores de acuerdo a una accion exitosa
  existeMsgExito:boolean = false;
  existeMsgActualizarExito:boolean = false;
  existeMsgQRExito:boolean = false;

  //error cuando qr ya fue generado
  existeQRregistrado:boolean = false;

  //por rol
  accesoDenegado:boolean = true;

  msgQR:string = "";

    //mostrar el formulario emergente cuando le den click al icono de editar
  mostrarFormularioEmergente:boolean = false;

  //valores pasados por referencia
  usuarioparaActualizar:any = {};
  idusuarioActualizar:any = "";

  //paginacion
  page:number = 0;
  busqueda:string = "";
  ocultarPaginacion:boolean = true;
  usuarioActual: any;

  noexistenUsuarios:boolean = false;
  constructor(
    private QRUDService: QRUDService,
    private StorageService: StorageService,
    private AuthService: AuthService,
    private ErrorServidor:ErrorServidorService
  ) { }

  ngOnInit(): void {
    this.restriccionPorRol();
    this.obtenerUsuarios(); 
  }



  obtenerUsuarios() {

    this.QRUDService.ObtenerRegistros("user").then((data:any) => {
      console.log(data)
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

  referenciaUsuarioActual(usuario:any){
    this.usuarioActual = usuario;
}


  eliminarUsuario(id:any) {
    this.QRUDService.EliminarRegistros("user",id).then((data:any) =>{
      this.usuarios = this.usuarios.filter(usuario => usuario.uid !==id );
      console.log(data);
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
  actualizarUsuario(id:any,usuario:any){
    this.mostrarFormularioEmergente = true;
    this.idusuarioActualizar = id; 
    this.usuarioparaActualizar = usuario;
 
  }
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

  enviarQR(id:any){
    this.QRUDService.GenerarQRUSuario(id).then((data:any) =>{
      console.log(data);

      this.existeMsgQRExito = true;
      this.msgQR = data.msg;

      setTimeout(() =>{
        this.existeMsgQRExito = false;
      },2000);
  

    }).catch(err => {
      console.log(err);
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

 restriccionPorRol(){
    const rol = this.StorageService.desencriptar("rol");

    if(rol == "AUX_ROLE"){
      this.accesoDenegado = false;
    }

  }
}
