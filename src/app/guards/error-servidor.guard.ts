import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorServidorService } from '../services/error-servidor.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorServidorGuard implements CanActivate {

  constructor(
    private router: Router,
    private servidor:ErrorServidorService
    ){}

  canActivate():boolean {
      
      if(this.servidor.errorServidor ){
        return true;

      }else{
        this.router.navigateByUrl("/");
        return false
      }
  }
  
}
