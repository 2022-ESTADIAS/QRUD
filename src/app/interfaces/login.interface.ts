
import {Personal} from "./personal.interface"

/**
 * propiedades de la interfaz de login
 */
export interface PersonalLogin {
    /**
     * propiedad que recibe el correo electronico del personal
     */
    email: string;
    /**
     * propiedad que recibe el password del personal
     */
    password: string;
}
/**
 * respuesta del backend tras haber iniciado sesion en la aplicacion corrrectamente
 */
export interface LoginResponse {
    /**
     * propiedad que recibe el estado de la peticion
     */
    status?:   string;
    /**
     * propiedad que recibe el mensaje de la peticion
     */
    msg?:      string;
    /**
     * propiedad que recibe el token del personal
     */
    token:    string;
    /**
     * propiedad que recibe el personal que ha iniciado sesion
     */
    personal: Personal;
}

