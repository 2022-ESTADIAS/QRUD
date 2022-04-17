import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * servicio para acceder a la ruta de error del servidor
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorServidorService {

  /**
   * propiedad que controla la redireccion al componente de error del servidor
   */
  errorServidor:boolean = false;
  /**
   * inyectando el servicio de rutas para redireccionar al componente de error del servidor si es que se produce un error
   * 
   */
  constructor(
    private router:Router
  ) { }

  /**
   * redirecciona al componente de error del servidor si es que se produce un error en la peticion http referente al tiempo de espera del servidor
   */
  error(){

    this.errorServidor = true;
    this.router.navigateByUrl("/error");
  }
  
}
