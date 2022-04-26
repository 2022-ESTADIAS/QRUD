import {Rol} from "./rol.interface";

/**
 * propiedades de la interfaz para realizar el registro del personal
 */
export interface RegistroPersonal {
    /**
     * propiedad que recibe el nombre del personal
     */
    nombre:  string;
    /**
     * propiedad que recibe el telefono del personal
     */
    telefono: number;
    /**
     * propiedad que recibe el email del personal
     */
    email: string;
    /**
     * propiedad que recibe el password del personal
     */
    password: string;
    /**
     * 
     * propiedad que recibe el rol que sera asignado al nuevo personal
     */
    rol: string;
}


/**
 * propiedades de la interfaz de personal
 */
export interface Personal {
    /**
     * propiedad que recibe el nombre del personal
     */
    nombre?:   string;
    /**
     * propiedad que recibe el telefono del personal
     */
    telefono?: string;
    /**
     * propiedad que recibe el email del personal
     */
    email?:    string;
    /**
     * propiedad que recibe el rol asignado al personal
     */
    rol:      Rol;
    /**
     * propiedad que indica si el personal se encuentra activo o no
     */
    isActivo?: boolean;
    /**
     * propiedad que indica si el personal tiene un qr o no
     */
    qr?:       boolean;
    /**
     * propiedad que recibe el uid del personal
     */
    uid?:      string;
}

