import { Component, OnInit } from '@angular/core';
import { Personal } from 'src/app/interfaces/personal.interface';
import { QRUDService } from 'src/app/services/qrud.service';

@Component({
  selector: 'app-ver-personal',
  templateUrl: './ver-personal.component.html',
  styleUrls: ['./ver-personal.component.css']
})
export class VerPersonalComponent implements OnInit {

  personas:Personal[] = [];
  existeMsgExito:boolean = false;

  existeMsgActualizarExito:boolean = false;
  mostrarFormularioEmergente:boolean = false;
  personalparaActualizar:any = {};
  idpersonalActualizar:any = "";


  constructor(
    private QRUDService: QRUDService
  ) { }

  ngOnInit(): void {
    this.obtenerPersonal();
  }



  obtenerPersonal() {

    this.QRUDService.ObtenerRegistros("personal").then((data:any) => {
      console.log(data)
      this.personas = data.personal;
    })

  }

  eliminarPersonal(id:any) {
    this.QRUDService.EliminarRegistros("personal",id).then((data:any) =>{
      this.personas = this.personas.filter(personal => personal.uid !==id );
      console.log(data);
      this.existeMsgExito = true;

      setTimeout(() => {
        this.existeMsgExito = false;
        }, 1500);
        
    })
  }


  actualizarPersonal(id:any,personal:any){
    this.mostrarFormularioEmergente = true;
    this.idpersonalActualizar = id; 
    this.personalparaActualizar = personal;
 
  }
  actualizandoArregloPersonal(data:any){
    this.personas= this.personas.map(personal => {
      if(personal.uid == data.uid){
          personal = data
          return personal
      }else return personal;
    })
    this.existeMsgActualizarExito = true;

    setTimeout(() =>{
      this.existeMsgActualizarExito = false;
    },2000);

  }

}
