import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errores-backend',
  templateUrl: './errores-backend.component.html',
  styleUrls: ['./errores-backend.component.css']
})
export class ErroresBackendComponent implements OnInit {
  @Input("mensaje") msgError:string ="";
  constructor() { }

  ngOnInit(): void {
  }

}
