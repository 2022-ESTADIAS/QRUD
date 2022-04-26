import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-errores-frontend',
  templateUrl: './errores-frontend.component.html',
  styleUrls: ['./errores-frontend.component.css']
})
export class ErroresFrontendComponent implements OnInit {

  /**
   * Recibe un mensaje de error personalizado que se muestra en el componente fue elaborado con el objetivo de atrapar los errores de validacion del frontend
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
