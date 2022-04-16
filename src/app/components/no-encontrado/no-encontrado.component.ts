import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent implements OnInit {
  
  @Input() mensaje:string = '';
 
  constructor() { }
  

  ngOnInit(): void {
  }

}
