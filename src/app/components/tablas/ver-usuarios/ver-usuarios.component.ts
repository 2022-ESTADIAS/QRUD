import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroUsuario, Usuario, UsuariosResponse } from 'src/app/interfaces/usuario.interface';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {
  usuarios:Usuario[] = [];

  existeMsgExito:boolean = false;
  existeMsgActualizarExito:boolean = false;
  existeMsgQRExito:boolean = false;
  accesoDenegado:boolean = true;

  msgQR:string = "";

  mostrarFormularioEmergente:boolean = false;
  usuarioparaActualizar:any = {};
  idusuarioActualizar:any = "";

  //paginacion
  page:number = 0;
  busqueda:string = "";


  constructor(
    private QRUDService: QRUDService,
    private StorageService: StorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.restriccionPorRol();
    this.obtenerUsuarios();
  }



  obtenerUsuarios() {

    this.QRUDService.ObtenerRegistros("user").then((data:any) => {
      console.log(data)
      this.usuarios = data.usuarios;
    }).catch(err =>{
      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
      }
    })
 
  }

  eliminarUsuario(id:any) {
    this.QRUDService.EliminarRegistros("user",id).then((data:any) =>{
      this.usuarios = this.usuarios.filter(usuario => usuario.uid !==id );
      console.log(data);
      this.existeMsgExito = true;

      setTimeout(() => {
        this.existeMsgExito = false;
        }, 1500);
        
    }).catch(err =>{
      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
      }
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
        if(err.error.msgtk){
          this.router.navigateByUrl("/login");
        }
    })

  }

 restriccionPorRol(){
    const rol = this.StorageService.desencriptar("rol");

    if(rol == "AUX_ROLE"){
      this.accesoDenegado = false;
    }

  }
}
