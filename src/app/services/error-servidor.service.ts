import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorServidorService {

  errorServidor:boolean = false;
  constructor(
    private router:Router
  ) { }

  error(){

    this.errorServidor = true;
    this.router.navigateByUrl("/error");
  }
  
}
