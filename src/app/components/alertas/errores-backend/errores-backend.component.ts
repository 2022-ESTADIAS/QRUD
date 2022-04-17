import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-errores-backend',
  templateUrl: './errores-backend.component.html',
  styleUrls: ['./errores-backend.component.css']
})
export class ErroresBackendComponent implements OnInit {
  
  /**
   * Recibe un mensaje de error personalizado que se muestra en el componente fue elaborado con el objetivo de atrapar los errores de backend
   * @param {string} mensaje
   */
  @Input("mensaje") msgError:string ="";

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
