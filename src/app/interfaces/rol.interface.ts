export interface RegistroRol{
    rol:string;
    description:string;
}


export interface RolesResponse {
    total?:    number;
    personal: DetallePorRol[];
}

export interface DetallePorRol {
    _id?:         string;
    rol?:         string;
    description?: string;
    __v?:         number;
}
