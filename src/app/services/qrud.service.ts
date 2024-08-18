import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistroPersonal } from '../interfaces/personal.interface';
import { RegistroRol } from '../interfaces/rol.interface';
import { RegistroUsuario } from '../interfaces/usuario.interface';
import { StorageService } from './storage.service';
import {
  DepartmentResponse,
  DevicesResponse,
  DriverForm,
  ProviderForm,
  QRUser,
  ReasonsForAdmissionsResponse,
  UserFromQRCodeResponse,
  VisitEntriesResponse,
  VisitorForm,
  VisitorFormPostResponse,
  VisitorsActiveVerificationResponse,
  VisitorTypeResponse,
} from '../interfaces/mexcal/index.interface';
import { DynamicTranslationsService } from './dynamic-translations.service';

/**
 * contiene la variable para realizar peticiones al servidor y el nombre de la llave para obtener el valor de sessionStorage
 */
const { url, llaveToken } = environment;
/**
 *  Servicio para realizar peticiones al servidor
 */
@Injectable({
  providedIn: 'root',
})
export class QRUDService {
  /**
   * propiedad que controla la redireccion al componente de error del servidor
   */
  errorServidor: boolean = false;
  /**
   * inyecta el servicio de almacenamiento y el httpClient para realizar las peticiones http al servidor
   */
  constructor(
    private http: HttpClient,
    private StorageService: StorageService,
    private languageService: DynamicTranslationsService
  ) {}

  /**
   * peticion dinamica para crear un registro en la aplicacion ya sea usuario, personal o rol, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user, personal o rol
   * @param data recibe el objeto con los datos del registro
   */
  crearRegistro(
    ruta: 'user' | 'personal' | 'rol',
    data: RegistroUsuario | RegistroPersonal | RegistroRol
  ) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .post(`${url}/${ruta}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  /**
   * peticion dinamica para obtener un registro en la aplicacion ya sea usuario, personal o rol, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user,personal o rol
   */
  ObtenerRegistros(ruta: 'user' | 'personal' | 'rol') {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .get(`${url}/${ruta}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  /**
   * peticion dinamica para actualizar un registro en la aplicacion ya sea usuario, personal o rol, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user, personal o rol
   * @param data recibe el objeto con los datos del registro para actualizarlo
   */
  ActualizarRegistros(
    ruta: 'user' | 'personal' | 'rol',
    id: string,
    data: any
  ) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .put(`${url}/${ruta}/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  /**
   * peticion dinamica para eliminar parcialmente un registro en la aplicacion ya sea usuario o personal, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user o personal
   * @param id recibe el id del registro a eliminar
   */
  EliminarRegistros(ruta: 'user' | 'personal', id: string) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .delete(`${url}/${ruta}/dlt/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  /**
   * peticion dinamica para eliminar permanentemente un registro en la aplicacion ya sea usuario o personal, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user o personal
   * @param id recibe el id del registro a eliminar permanentemente
   */
  EliminarRegistrosPermanentemente(ruta: 'user' | 'personal', id: string) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .delete(`${url}/${ruta}/def/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  /**
   * peticion para generar el codigo QR al usuario registrados y activos  en la aplicacion
   * @param id recibe el id del usuario para generar el codigo QR
   */
  GenerarQRUSuario(id: any) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .get(`${url}/user/qr/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  /**
   * peticion dinamica para obtener los registros inactivos de la aplicacion ya sea usuario o personal, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user o personal
   */
  VerEliminados(ruta: 'user' | 'personal') {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .get(`${url}/${ruta}/eliminados`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  /**
   * peticion dinamica para activar los usuarios inactivos de la aplicacion ya sea usuario o personal, segun la ruta  que se le pase como parametro. el token de autenticacion se obtiene de la variable de sessionStorage el cual es encriptado y almacenado tras haber sido generado en el login.
   * @param ruta recibe como valor user o personal
   * @param id recibe el id del registro a activar
   */
  activarUsuarios(ruta: 'user' | 'personal', id: any) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .get(`${url}/${ruta}/active/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  /**
   * peticion para realizar el cambio de contraseña interno del personal
   * @param data se envia las contraseñas vieja y nueva del personal para realizar el cambio de contraseña
   */
  cambiarContrasena(data: any) {
    const token = this.StorageService.desencriptar(llaveToken);

    return new Promise((resolve, reject) => {
      this.http
        .put(`${url}/personal/changepwd`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  /**
   * peticion para realizar el cambio de contraseña atraves de un correo electronico que se le enviara al personal  para realizar el cambio de contraseña
   */
  olvideContrasena(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${url}/personal/forgot-pwd`, data).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  /**
   * peticion para enviar el token de recuperacion de contraseña al servidor del backend para realizar el cambio de contraseña
   */
  restablecerContrasenaCorreo(data: any, id: any, token: any) {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${url}/personal/email-pwd?token=${token}&id=${id}`, data)
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getAllDepartments() {
    return new Promise<DepartmentResponse>((resolve, reject) => {
      this.http
        .get<DepartmentResponse>(`${url}/public/departments`, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  visitorsTypes() {
    return new Promise<VisitorTypeResponse>((resolve, reject) => {
      this.http
        .get<VisitorTypeResponse>(`${url}/public/visitors-types`, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  devices() {
    return new Promise<DevicesResponse>((resolve, reject) => {
      this.http
        .get<DevicesResponse>(`${url}/public/devices`, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  reasons() {
    return new Promise<ReasonsForAdmissionsResponse>((resolve, reject) => {
      this.http
        .get<ReasonsForAdmissionsResponse>(`${url}/public/reasons`, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  publicRegisterQRCode(
    data: VisitorForm | ProviderForm | DriverForm | FormData
  ) {
    return new Promise<VisitorFormPostResponse>((resolve, reject) => {
      this.http
        .post<VisitorFormPostResponse>(`${url}/public/registro`, data, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  visitorsEntries(data: QRUser) {
    return new Promise<VisitEntriesResponse>((resolve, reject) => {
      this.http
        .post<VisitEntriesResponse>(`${url}/public/visitors-entries`, data, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  visitorsActiveVerification(id: string) {
    return new Promise<VisitorsActiveVerificationResponse>(
      (resolve, reject) => {
        this.http
          .get<VisitorsActiveVerificationResponse>(
            `${url}/public/visitors-active-verification/${id}`,
            {
              headers: {
                lang: this.languageService.gettranslate().currentLang,
              },
            }
          )
          .subscribe(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
      }
    );
  }
  getQRCodeUser(id: string) {
    return new Promise<UserFromQRCodeResponse>((resolve, reject) => {
      this.http
        .get<UserFromQRCodeResponse>(`${url}/public/qrcode/user/${id}`, {
          headers: {
            lang: this.languageService.gettranslate().currentLang,
          },
        })
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
