import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-encontrado',
  templateUrl: './no-encontrado.component.html',
  styleUrls: ['./no-encontrado.component.css']
})
export class NoEncontradoComponent implements OnInit {

  constructor() { }
  @Input() mensaje:string = '';

  ngOnInit(): void {
  }

}
