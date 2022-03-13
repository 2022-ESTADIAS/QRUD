import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginResponse, PersonalLogin } from '../interfaces/login.interface';
import { StorageService } from './storage.service';

const {url,llaveRole,llaveToken} = environment;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private StorageService:StorageService
    ) { }


  login(personal:PersonalLogin){

    return new Promise<LoginResponse>((resolve, reject) => {
      this.http.post<LoginResponse>(`${url}/auth/login`,personal).subscribe((data) =>{
        resolve(data)
          this.StorageService.encryptar(llaveToken ,data.token)
          this.StorageService.encryptar(llaveRole,data.personal.rol.rol)
      },err=> {
        reject(err)
      })
    })
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl("/login");

  }

}
