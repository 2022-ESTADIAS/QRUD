import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistroPersonal } from '../interfaces/personal.interface';
import { RegistroRol, RolesResponse } from '../interfaces/rol.interface';
import { RegistroUsuario, UsuariosResponse } from '../interfaces/usuario.interface';
import { StorageService } from './storage.service';

const {url,llaveToken} = environment 

@Injectable({
  providedIn: 'root'
})
export class QRUDService {

  constructor(
    private http: HttpClient,
    private StorageService: StorageService
  ) { }

    crearRegistro(ruta:"user" | "personal" | "rol", data:RegistroUsuario | RegistroPersonal |RegistroRol ){
      const token = this.StorageService.desencriptar(llaveToken)
      
      return new Promise((resolve, reject) => {
        
        this.http.post(`${url}/${ruta}`,data,{headers:{"Authorization":`Bearer ${token}`}}).subscribe((data)=>{
          resolve(data)
        },error =>{
          reject(error);
        })

      })
      
    }
    
    ObtenerRegistros(ruta: "user" | "personal" | "rol"){
      const token = this.StorageService.desencriptar(llaveToken)
      
      console.log(token)
      return new Promise((resolve,reject)=>{
        this.http.get(`${url}/${ruta}`,{headers:{"Authorization":`Bearer ${token}`}}).subscribe(data =>{
          resolve(data)
        },err=>{
          reject(err)
        })
      })
    }

    EliminarRegistros(ruta:"user" | "personal",id:string){
      const token = this.StorageService.desencriptar(llaveToken);
      return new Promise((resolve,reject)=>{
        
        this.http.delete(`${url}/${ruta}/${id}`,{headers:{"Authorization":`Bearer ${token}`}}).subscribe(data =>{
          resolve(data)
        },err=>{
          reject(err)
        })
        
      })
    }

  ActualizarRegistros(ruta:"user" | "personal" | "rol",id:string,data:any){
    const token = this.StorageService.desencriptar(llaveToken);
    return new Promise((resolve,reject)=>{
      
      this.http.put(`${url}/${ruta}/${id}`,data,{headers:{"Authorization":`Bearer ${token}`}}).subscribe(data =>{
        resolve(data)
      },err=>{
        reject(err)
      })

    })
    
  }


}
