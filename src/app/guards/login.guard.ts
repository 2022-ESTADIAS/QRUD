import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

/**
 * variables que contienen el nombre de las llaves para obtener el valor de sessionStorage
 */
const {llaveToken,llaveRole} = environment;

/**
 * guardian que protege las rutas principales de la aplicacion para que solo el personal logueado puedan acceder a ellas
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    /**
     * inyeccion de servicios
     */
  constructor(
    private router: Router,
    private StorageService: StorageService,
    
    ){

  }
  /**
   * metodo que valida si el token de autenticacion existe en sessionStorage si es asi redirecciona al componente principal de la aplicacion caso contrario redirecciona al componente de login
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const token = this.StorageService.obtenerDeLocalStorage(llaveToken);  
      const rol = this.StorageService.obtenerDeLocalStorage(llaveRole);  
      
      if(  token  && rol ){  
        return true;
      }
      else { 
        sessionStorage.clear()
        this.router.navigateByUrl("/login")
        return false
      }
  }
}
