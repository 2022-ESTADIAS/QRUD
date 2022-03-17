import { Component, OnInit } from '@angular/core';
import { RegistroUsuario, Usuario, UsuariosResponse } from 'src/app/interfaces/usuario.interface';
import { QRUDService } from 'src/app/services/qrud.service';

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

  msgQR:string = "";

  mostrarFormularioEmergente:boolean = false;
  usuarioparaActualizar:any = {};
  idusuarioActualizar:any = "";


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

  eliminarUsuario(id:any) {
    this.QRUDService.EliminarRegistros("user",id).then((data:any) =>{
      this.usuarios = this.usuarios.filter(usuario => usuario.uid !==id );
      console.log(data);
      this.existeMsgExito = true;

      setTimeout(() => {
        this.existeMsgExito = false;
        }, 1500);
        
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
    })

  }
}
