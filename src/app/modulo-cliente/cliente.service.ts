import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const {url}=environment
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  RegistrarUsuarioPublico(usuario:any){
    return new Promise((resolve, reject) => {
      this.http.post(`${url}/public/registro`,usuario).subscribe((data)=>{
        resolve(data)
      },(error)=>{
        reject(error)
      })
    })
  }
  ActivarUsuarioPublico(id:any){
    return new Promise((resolve, reject) => {
      this.http.get(`${url}/public/email-active/${id}`).subscribe((data)=>{
        resolve(data)
      },(error)=>{
        reject(error)
      })
    })
  }
}
