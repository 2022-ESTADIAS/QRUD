/**
 * propiedades de la interfaz para registrar nuevos usuarios
 */
export interface RegistroUsuario {
    /**
     * propiedad que recibe el nombre del usuario
     */
    nombre: string;
    /**
     * propiedad que recibe el rfc del usuario
     */
    rfc:string;
    /**
     * propiedad que recibe la direccion del usuario
     */
    direccion:string;

    /**
     * propiedad que recibe el telefono del usuario
     */
    telefono:number;
    /**
     * propiedad que recibe el email del usuario
     */
    email:string;
}

/**
 * propiedades de la interfaz de usuario
 */
export interface Usuario {

    /**
     * propiedad que recibe el nombre del usuario
     */
     nombre: string;
     /**
      * propiedad que recibe el rfc del usuario
      */
     rfc:string;
     /**
      * propiedad que recibe la direccion del usuario
      */
     direccion:string;
 
     /**
      * propiedad que recibe el telefono del usuario
      */
     telefono:number;
     /**
      * propiedad que recibe el email del usuario
      */
     email:string;

     /**
      * propiedad que indica si el usuario se encuentra activo o no
      */
    isActivo?:  boolean;
    /**
     * propiedad que indica si el usuario tiene un qr o no
     */
    qr?:        boolean;
    /**
     * propiedad que recibe el uid del usuario
     */
    uid?:       string;
}


