import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {

  /**
 * Esta propiedad se utiliza para controlar la numeracion de la paginacion la cual va incrementando o decrementando los registros de 10 en 10
 */
   pagina:number = 0;
  
   /**
    * Esta propiedad recibe el numero total de gasolineras para poder seccionar apropiadamente los registros
    */
   @Input() longitud:number = 0;
   
   /**
    * Esta propiedad recibe un valor booleano proveido por el componente app-buscador atraves del evento mostrarOcultarBotones con el cual se controlara el momento en el que se debera ocultar o mostrar la paginacion
    */
   @Input() ocultarBotones:boolean = true;
 
   /**
    * Esta propiedad contendra un arreglo numerico el cual se ira llenando dependiendo la cantidad de paginas 
    */
   arregloPaginacion:number[] = [];
   
   /**
    * Esta propiedad controla la cantidad de paginas que tendra la paginacion
    */
   totaldePaginas:number = 0;
   
   /**
    * Esta propiedad se utiliza para controlar el momento en el que se debe colocar la clase active una vez la pagina coincida con el numero seleccionado ya sea por un evento click o por que el usuario cambia de pagina usando los botones siguiente o anterior
    */
   contadorPaginacion:number = 0;
 
   /**
    * Esta propiedad emite la pagina en la que actualmente se encuentre el usuario navegando 
    */
   @Output() paginaActual:EventEmitter<number> = new EventEmitter<number>();
 
   /**
    * @ignore 
    */
   constructor() { }
 
   /**
    * En este metodo se realizo la logica para llenar el arreglo de la propiedad  arregloPaginacion, el cual consiste en que se divide el numero total de gasolineras entre la cantidad de registros por pagina para posteriormente llenar el arreglo del 0 al 8 para poder controlar el numero de paginas que seran renderizadas
    * @example 
    * 90/10 = 9 las cuales serian las paginas que tendria el componente
    * 
    */
   ngOnInit(): void {
 
     this.totaldePaginas = this.longitud / 10;
     for(let i = 0; i < this.totaldePaginas; i++) {
       this.arregloPaginacion.push(i);
 
     }
     console.log(this.longitud)
   
   }
 
 /**
  * Con este metodo se renderizan los pasados 10 registros y si en algun punto ya no hay mas registros anteriores (0) entonces oculta el boton de retroceso, de igual forma va mostrando la pagina activa en la que se encuentra
  *  */
   paginaAnterior(){
 
     if(this.pagina <= 0){
       this.contadorPaginacion = 0;
       return;
     }
     this.pagina -=10;
     this.contadorPaginacion--;
     this.paginaActual.emit(this.pagina);
   }
   /**
    * Con este metodo se renderizan los siguientes 10 registros y si en algun punto ya no hay mas registros (se exedio la longitud del arreglo) entonces oculta el boton de siguiente, de igual forma va mostrando la pagina activa en la que se encuentra
    */
   paginaSiguiente(){
     
     if(this.pagina < this.longitud -10){
       
       this.pagina+=10;
       this.contadorPaginacion ++;
       this.paginaActual.emit(this.pagina);
       return; 
     }
   }
 /**
  * Con este metodo se muestra una pagina en especifico sin necesidad de ir cambiando con los botones de retroceso o siguiente
  * @param n recibe el numero de pagina que el usuario desea acceder
  * 
  */
   saltoEntrePaginas(n:number){
     n = n *  10 ; 
     
     if(n  == 0 ){
       this.pagina =0;
       this.contadorPaginacion  = n;
       this.paginaActual.emit(this.pagina);
     }else{
       this.pagina = n;
       this.contadorPaginacion  = n / 10;
       this.paginaActual.emit(this.pagina);
 
     }
   }

}
