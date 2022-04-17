
/**
 * propiedades para registrar un nuevo rol
 */
export interface RegistroRol{
    /**
     * propiedad que recibe el nombre del rol
     */
    rol:string;
    /**
     * propiedad que  recibe una descripcion respecto a las funcionalidades del rol
     */
    description:string;
}

/**
 * propiedades de la interfaz de rol
 */
export interface Rol {
    /**
     * propiedad que recibe el id del rol
     */
    _id?:         string;
    /**
     * propiedad que recibe el nombre del rol
     */
    rol:         string;
    /**
     * propiedad que recibe una descripcion respecto a las funcionalidades del rol
     */
    description?: string;
    /**
     * @ignore
     */
    __v?:         number;
}

