import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,  } from '@angular/router';

/**
 * guardian que protege la ruta para actualizar la contraseña del personal cuando se envia un correo electronico para recuperar la contraseña de esta forma solo puede ser accedido cuando se haya enviado un correo electronico
 */
@Injectable({
  providedIn: 'root'
})
export class EmailGuard implements CanActivate {
  /**
   * si el token y el id del personal son enviados en la url de la ruta de actualizar contraseña del personal entonces se puede acceder a la ruta de actualizar contraseña del personal caso contrario se redirecciona al componente principal de la aplicacion
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      const {token,id} = route.queryParams;
      
      if(token.length ==60 && id.length ==24){
        return true;
      }
      else{
        return false
      }



   

  }
  
}
