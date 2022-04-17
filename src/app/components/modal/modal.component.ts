import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  /**
   * recibe un mensaje personalizado para mostrar en el modal
   */
  @Input() msg:any;
  /**
   * recibe una funcion que se ejecutara tras haber sido confirmada por el personal
   */
  @Input() funcion:any;
  /**
   * recibe un titulo personalizado para mostrar en el modal
   */
  @Input() titulo:any;
  /**
   * recibe un id personalizado para identificar el modal
   */
   @Input() modal:any;
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
   * metodo que permite ejecutar una accion tras haber sido confirmada por el personal
   */
  ejecutarAccion(){
    this.funcion();
  }


}
