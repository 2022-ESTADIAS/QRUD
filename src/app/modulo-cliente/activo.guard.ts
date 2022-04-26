import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivoGuard implements CanActivate {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    /* console.log(this.route.params) */
    if(route.params["id"].length == 24){
      return true;
    }else{
      this.router.navigateByUrl("/usuario/bienvenido")
      return false;
    }
    console.log(route.params["id"])
      
  }
  
}
