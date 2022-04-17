import { Component, Input, OnInit } from '@angular/core';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent implements OnInit {

  /**
   * Recibe un mensaje personalizado para mostrarlo en el componente 
   */
  @Input() mensaje:string = '';

 /**
  * @ignore
  */
  constructor() { }
  
  /**
  * @ignore
  */
  ngOnInit(): void {
  }

}
