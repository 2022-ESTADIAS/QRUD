import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.css']
})
export class ExitoComponent implements OnInit {

  @Input("mensaje") msg: string ="";
  
  constructor() { }

  ngOnInit(): void {
  }

}
