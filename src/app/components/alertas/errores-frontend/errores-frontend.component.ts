import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errores-frontend',
  templateUrl: './errores-frontend.component.html',
  styleUrls: ['./errores-frontend.component.css']
})
export class ErroresFrontendComponent implements OnInit {

  @Input("mensaje") msg: string ="";

  constructor() { }

  ngOnInit(): void {
  }

}
