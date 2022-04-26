import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
  styleUrls: ['./activo.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ActivoComponent implements OnInit {
  id:any
  Tiempo:any
  Saludo:any
  constructor(
    private ac: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      console.log(data)
      this.id = data.id
      this.ac.ActivarUsuarioPublico(this.id).then((data:any)=>{
        console.log(data)
        if(data.msg){
          this.router.navigateByUrl("/usuario/bienvenido")
        }
      })
    })
    this.Tiempo = new Date().toLocaleString().split(",")[1].split(":")[0]
    /* this.Tiempo = 20 */
    if(this.Tiempo >= 0 && this.Tiempo <= 11){
      this.Saludo = "Buenos dias" 
    }else if(this.Tiempo >= 12 && this.Tiempo <= 19){
      this.Saludo = "Buenas tardes"
    }else {
      this.Saludo = "Buenas noches"
    }
  }

}
