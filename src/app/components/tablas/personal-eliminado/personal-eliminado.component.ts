import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Personal } from 'src/app/interfaces/login.interface';
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

  constructor(
    private QRUDService:QRUDService,
    private router:Router
    ) { }

  ngOnInit(): void { 
    this.obtenerPersonalEliminado();
  }

  obtenerPersonalEliminado(){
    this.QRUDService.VerUsuariosEliminados("personal").then((data:any)=>{
      console.log(data);
      this.personas = data.personals;
    }).catch(err =>{
      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
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
        }, 1500);
    }).catch(err =>{
      if(err.error.msgtk){
        this.router.navigateByUrl("/login");
      }
    })
  } 

  referenciaUsuarioActual(personal:any){
      this.personalActual = personal;
  }

  eliminarUsuarioPermanentemente(id:any){
    this.QRUDService.EliminarRegistrosPermanentemente('user',id).then((data) => {
      this.personas = this.personas.filter(personal => personal.uid !==id );
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


}
