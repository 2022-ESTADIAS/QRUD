import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BienvenidaComponent implements OnInit {

  Tiempo:any
  Saludo:any
  constructor() { }

  ngOnInit(): void {
    this.Tiempo = new Date().toLocaleString().split(",")[1].split(":")[0]
    /* this.Tiempo = 20 */
    if(this.Tiempo >= 0 && this.Tiempo <= 11){
      this.Saludo = "Buenos dias" 
    }else if(this.Tiempo >= 12 && this.Tiempo <= 19){
      this.Saludo = "Buenas tardes"
    }else {
      this.Saludo = "Buenas noches"
    }
    console.log(this.Tiempo)
  }

}
