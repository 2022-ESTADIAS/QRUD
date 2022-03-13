import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

const {llaveToken,llaveRole} = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    
  constructor(
    private router: Router,
    private StorageService: StorageService,
    
    ){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const token = this.StorageService.obtenerDeLocalStorage(llaveToken);  
      const rol = this.StorageService.obtenerDeLocalStorage(llaveRole);  
      
      if(  token  && rol ){  
        return true;
      }
      else { 
        // localStorage.clear() 
        sessionStorage.clear()
        this.router.navigateByUrl("/login")
        return false
      }
  }
}
