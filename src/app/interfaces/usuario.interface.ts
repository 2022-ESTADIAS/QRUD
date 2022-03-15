export interface RegistroUsuario {

    nombre: string;
    rfc:string;
    direccion:string;
    telefono:number;
    email:string;
}

export interface UsuariosResponse {
    total:    number;
    usuarios: Usuario[];
}

export interface Usuario {
    nombre?:    string;
    rfc?:       string;
    direccion?: string;
    telefono?:  string;
    email?:     string;
    isActivo?:  boolean;
    qr?:        boolean;
    uid?:       string;
}


