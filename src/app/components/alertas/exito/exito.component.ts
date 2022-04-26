import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.css']
})
export class ExitoComponent implements OnInit {
  
  /**
   * Recibe un mensaje de exito personalizado que se muestra en el componente fue elaborado con el objetivo de atrapar los  casos cuando se realiza una operacion exitosa
   * @param {string} mensaje
   */
  @Input("mensaje") msg: string ="";
  
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
