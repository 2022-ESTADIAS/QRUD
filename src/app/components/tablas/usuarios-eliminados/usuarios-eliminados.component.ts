import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-usuarios-eliminados',
  templateUrl: './usuarios-eliminados.component.html',
  styleUrls: ['./usuarios-eliminados.component.css']
})
export class UsuariosEliminadosComponent implements OnInit {
  usuarios: Usuario[] = []
  existeMsgExito:boolean = false;
  usuarioActual:any= {};

  page:number = 0;
  busqueda:string = "";
  ocultarPaginacion:boolean = true;

  noexistenUsuarios:boolean = false;

  constructor(
    private QRUDService:QRUDService,
    // private router:Router,
    private AuthService: AuthService
    ) { }

  ngOnInit(): void {
    this.obtenerUsuariosEliminados();
  }

  obtenerUsuariosEliminados(){
    this.QRUDService.VerUsuariosEliminados("user").then((data:any)=>{
      console.log(data);
      this.usuarios = data.usuarios;

      if(this.usuarios.length == 0){
        this.noexistenUsuarios =true;
      }

    }).catch(err =>{
      if(err.error.msgtk){
        this.AuthService.logout();
      }
    })
  }

  activarUsuario(id:any){
    this.QRUDService.activarUsuarios("user",id).then((data:any)=>{
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
        this.AuthService.logout();
      }
    })
  } 

  referenciaUsuarioActual(usuario:any){
      this.usuarioActual = usuario;
  }

  eliminarUsuarioPermanentemente(id:any){
    this.QRUDService.EliminarRegistrosPermanentemente('user',id).then((data) => {
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
        this.AuthService.logout();
      }
    })
  }

}
