import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginResponse, PersonalLogin } from '../interfaces/login.interface';
import { StorageService } from './storage.service';

/**
 * contiene la variable para realizar peticiones al servidor y el nombre de las llaves para obtener el valor de sessionStorage
 */
const {url,llaveRole,llaveToken} = environment;

/**
 * servicio para realizar el login del personal
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * inyecta el servicio de almacenamiento y el httpClient para realizar las peticiones http al servidor
   */
  constructor(
    private http:HttpClient,
    private router:Router,
    private StorageService:StorageService
    ) { }

    /**
     * peticion para realizar el inicio de sesion en la aplicacion y obtener el token de autenticacion para poder realizar peticiones al servidor. El token se almacena en sessionStorage y se encripta para que no sea visible en el navegador. Una vez obtenido el token se redirecciona al componente principal de la aplicacion.
     * @param data recibe el objeto con los datos del personal
     */
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
  /**
   * peticion para cerrar la sesion del personal en la aplicacion y eliminar el token de autenticacion de sessionStorage.
   */
  logout() {
    sessionStorage.clear()
    this.router.navigateByUrl("/login");

  }

}
