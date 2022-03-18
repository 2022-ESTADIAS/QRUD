import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  search:string ='';
  toggleButtons:any= true;
  @Input() page:number = 0;

  @Output() busqueda:EventEmitter<string> = new EventEmitter<string>();
  @Output() mostrarOcultarBotones:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onSearch(search:string){
    if(search.length == 0){
      this.toggleButtons = true;
      this.mostrarOcultarBotones.emit(this.toggleButtons);
      this.page = 0;
      return;
    }
    
    this.search = search;
    this.toggleButtons  = false;
    this.mostrarOcultarBotones.emit(this.toggleButtons);
    this.busqueda.emit(this.search);
  }
  

}
