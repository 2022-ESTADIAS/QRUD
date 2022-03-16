export interface PersonalLogin {

    email: string;
    password: string;
}

export interface LoginResponse {
    status?:   string;
    msg?:      string;
    token:    string;
    personal: Personal;
}

export interface Personal {
    nombre:   string;
    telefono: string;
    email:    string;
    rol:      Rol;
    isActivo?: boolean;
    qr?:       boolean;
    uid?:      string;
}

export interface Rol {
    _id?:         string;
    rol:         string;
    description?: string;
    __v?:         number;
}
