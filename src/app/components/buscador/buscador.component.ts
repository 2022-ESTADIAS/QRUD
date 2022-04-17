import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  /**
   * almacena la busqueda hecha por el personal
   */
  search:string ='';

  /**
   * bandera que permite controlar el momento en el que se muestra el componente de paginacion
   */
  togglePaginacion:any= true;

  /**
   * Evento que se encarga de emitir la busqueda al componente padre
   */
  @Output() busqueda:EventEmitter<string> = new EventEmitter<string>();

  /**
   * Evento que se encarga de emitir el valor booleno para controlar la aparicion del componente paginacion al componente padre
   */
  @Output("ocultar") mostrarOcultarPaginacion:EventEmitter<boolean> = new EventEmitter<boolean>();
  /**
   * @ignore
   */
  constructor() { }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Metodo encargado de emitir la busqueda al componente padre solo si la busqueda es diferente de vacio de igual forma se encarga de emitir la bandera para ocultar el componente de paginacion caso contrario no se realiza la busqueda y se muestra el componente de paginacion
   * @param {string} search recibe como parametro el valor de la busqueda
   * @param {event} e  recibe como parametro el evento que se genera al presionar cualquier tecla
   */
  busquedaRegistros(e:any,search:string){
    
    if(e.key =="Backspace" && search.length == 0 ){
      this.busqueda.emit("");
    this.togglePaginacion = true;
      this.mostrarOcultarPaginacion.emit(this.togglePaginacion);
      return;
    }
    this.search = search;
    this.togglePaginacion  = false;
    this.busqueda.emit(this.search);
    this.mostrarOcultarPaginacion.emit(this.togglePaginacion);

    


  }

}
