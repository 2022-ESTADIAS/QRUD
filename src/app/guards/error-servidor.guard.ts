import { Injectable } from '@angular/core';
import {  CanActivate, Router, } from '@angular/router';
import { ErrorServidorService } from '../services/error-servidor.service';

/**
 * guardian que protege la ruta de error del servidor para que solo pueda ser accedida cuando se haya presentado un error en el servidor
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorServidorGuard implements CanActivate {

  /**
   * inyeccion de servicios
   */
  constructor(
    private router: Router,
    private servidor:ErrorServidorService
    ){}
    /**
     * metodo que valida si se ha presentado un error en el servidor y redirecciona al componente de error del servidor en caso contrario redirecciona al componente principal de la aplicacion con el fin de que el personal no pueda acceder a la ruta de error del servidor a menos que se haya presentado un error en el servidor
     */
  canActivate():boolean {
      
      if(this.servidor.errorServidor ){
        return true;

      }else{
        this.router.navigateByUrl("/");
        return false
      }
  }
  
}

