import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() msg:any;
  @Input() funcion:any;
  @Input() titulo:any;
   @Input() modal:any;

  constructor() { }

  ngOnInit(): void {
  }

  ejecutarAccion(){
    this.funcion();
  }


}
