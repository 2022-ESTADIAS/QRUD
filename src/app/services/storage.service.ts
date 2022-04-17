import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

/**
 * variable que contiene el secreto para encriptar y desencriptar
 */
  const {secret_key} = environment;

  /**
   * servicio para realizar encriptacion y desencriptacion de datos
   */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /**
   * almacena el texto encriptado
   */
  mensajeEncriptado:string ="";
  /**
   * almacena el texto desencriptado
   */
  mensajeDesencriptado:string ="";

  /**
   * @ignore
   */
  constructor() { }

  /**
   * metodo que encripta una cadena de texto con el algoritmo AES y la llave secreta definida en las varibles de entorno
   * su funcion es encriptar los valores almacenados en sessionStorage para que no sean visibles en la aplicacion brindando seguridad mientras se trabaja en la aplicacion con esos valores
   * @param text texto a encriptar
   * @param llave secreto para encriptar el texto
   */
  async encryptar(llave:string,text:string){ 
    this.mensajeEncriptado = CryptoJS.AES.encrypt(text,secret_key).toString();
    sessionStorage.setItem(llave,this.mensajeEncriptado);  
  }
  /**
   * metodo que desencripta una cadena de texto con el algoritmo AES y la llave secreta definida en las varibles de entorno
   */
  desencriptar(llave:any){
  const valor:any = this.obtenerDeLocalStorage(llave) || "";

  const textoOriginal = CryptoJS.AES.decrypt(valor,secret_key)
  this.mensajeDesencriptado  = textoOriginal.toString(CryptoJS.enc.Utf8);

  return this.mensajeDesencriptado;
 
  }
/**
 * metodo que obtiene un valor de sessionStorage
 */
  obtenerDeLocalStorage(key: string){
   const valor = sessionStorage.getItem(key) || '';
   return valor;
  }
    /**
     * metodo que guarda un valor en sessionStorage
     */
  guardarSesionStorage(llave:string,valor:any){
    sessionStorage.setItem(llave,valor);
  }


}
