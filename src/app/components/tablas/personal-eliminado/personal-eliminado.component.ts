import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-personal-eliminado',
  templateUrl: './personal-eliminado.component.html',
  styleUrls: ['./personal-eliminado.component.css']
})
export class PersonalEliminadoComponent implements OnInit {
  personas:Personal [] = [];
  existeMsgExito:boolean = false;
  personalActual:any= {};

  page:number = 0;
  busqueda:string = "";
  ocultarPaginacion:boolean = true; 

  noexistePersonal:boolean = false;
  constructor(
    private QRUDService:QRUDService,
    private router:Router,
    private AuthService: AuthService,
    ) { }

  ngOnInit(): void { 
    this.obtenerPersonalEliminado();
  }

  obtenerPersonalEliminado(){
    this.QRUDService.VerUsuariosEliminados("personal").then((data:any)=>{
      console.log(data);
      this.personas = data.eliminados;
      if(this.personas.length == 0){
        this.noexistePersonal =true;
      } 
    }).catch(err =>{
      if(err.error.msgtk){
        this.AuthService.logout();
      }
    })
  }

  activarUsuario(id:any){
    this.QRUDService.activarUsuarios("personal",id).then((data:any)=>{
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

  referenciaUsuarioActual(personal:any){
      this.personalActual = personal;
  }

  eliminarUsuarioPermanentemente(id:any){
    this.QRUDService.EliminarRegistrosPermanentemente('personal',id).then((data) => {
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


}
