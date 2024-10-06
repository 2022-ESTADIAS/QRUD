import { Component, OnInit } from '@angular/core';
import { VisitorSearchParams } from 'src/app/interfaces/mexcal/visitors.interface';
import { Personal } from 'src/app/interfaces/personal.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DynamicTranslationsService } from 'src/app/services/dynamic-translations.service';
import { ErrorServidorService } from 'src/app/services/error-servidor.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

/**
 * nombre, hoja de estilos y archivo html del componente
 */
@Component({
  selector: 'app-ver-personal',
  templateUrl: './ver-personal.component.html',
  styleUrls: ['./ver-personal.component.css'],
})
export class VerPersonalComponent implements OnInit {
  /**
   * almacena todos los registros del personal activo
   */
  personas: Personal[] = [];
  /**
   * propiedad que muestra el mensaje de exito solo si la accion de eliminar se realizo con exito
   */
  existeMsgExito: boolean = false;
  /**
   * propiedad que muestra el mensaje de exito solo si la accion de actualizar se realizo con exito
   */
  existeMsgActualizarExito: boolean = false;
  /**
   * propiedad que muestra el formulario emergente para actualizar el personal
   */
  mostrarFormularioEmergente: any = false;
  /**
   * propiedad que almacena la referencia del personal que se desea actualizar
   */

  mostrarAsignacionDeCamiones: any = false;

  personalparaActualizar: any = {};
  /**
   * propiedad que almacena el id del personal que se desea actualizar
   */
  idpersonalActualizar: any = '';

  clienteId: any = '';

  /**
   * propiedad que restringe el acceso a ciertas acciones que esten delimitadas por el rol del personal logueado
   */
  accesoDenegado: boolean = true;

  /**
   * propiedad que controla la pagina actual del registro
   */
  page: any = 1;
  /**
   * almacena la busqueda realizada por el personal
   */
  busqueda: any = '';
  /**
   * propieda que controla el momento para mostrar la paginacion
   */
  ocultarPaginacion: any = true;

  /**
   * propiedad que almacena la referencia del personal
   */
  personalActual: any;
  /**
   * propeidad que controla el momento para mostrar el mensaje de no encontrado cuando la busqueda no arroja resultados
   */
  noexistePersonal: boolean = false;

  pages: number = 1;

  /**
   * inyeccion de servicios
   */
  constructor(
    private QRUDService: QRUDService,
    private StorageService: StorageService,
    private AuthService: AuthService,
    private ErrorServidor: ErrorServidorService,
    private translateHelper: DynamicTranslationsService
  ) {}

  /**
   * metodo que se ejecuta al iniciar el componente el cual obtiene todos los registros del personal activo y verifica el rol del personal logueado
   */
  ngOnInit(): void {
    this.obtenerPersonal({});
    this.restriccionPorRol();
  }

  nextPage() {
    this.obtenerPersonal({
      page: this.page + 1,
    });
  }
  prevPage() {
    this.obtenerPersonal({
      page: this.page - 1,
    });
  }

  search(searchParam: string) {
    this.obtenerPersonal({
      keyword: searchParam,
    });
  }
  /**
   * metodo que obtiene todos los registros del personal activo
   */
  obtenerPersonal(opt: VisitorSearchParams) {
    const { page, keyword } = opt;
    let visitorUrl = `personal`;
    if (page && keyword) {
      visitorUrl = `personal?pageNumber=${page}&keyword=${keyword}`;
    } else if (keyword) {
      visitorUrl = `personal?keyword=${keyword}`;
    } else if (page) {
      visitorUrl = `personal?pageNumber=${page}`;
    } else {
      visitorUrl = `personal`;
    }

    this.QRUDService.ObtenerRegistros(visitorUrl)
      .then((data: any) => {
        this.personas = data.personal;

        if (this.personas.length == 0) {
          this.noexistePersonal = true;
        }
      })
      .catch((err) => {
        if (err.error.msgtk) {
          this.AuthService.logout();
          return;
        }
        this.ErrorServidor.error();
      });
  }
  /**
   * metodo que elimina el registro del personal
   */
  eliminarPersonal(id: any) {
    this.QRUDService.EliminarRegistros('personal', id)
      .then((data: any) => {
        this.personas = this.personas.filter((personal) => personal.uid !== id);
        this.existeMsgExito = true;

        setTimeout(() => {
          this.existeMsgExito = false;

          if (this.personas.length == 0) {
            this.noexistePersonal = true;
          }
        }, 1500);
      })
      .catch((err) => {
        if (err.error.msgtk) {
          this.AuthService.logout();
          return;
        }
        this.ErrorServidor.error();
      });
  }
  /**
   * metodo que guarda la referencia del personal que se desea eliminar
   */
  referenciaPersonalActual(personal: any) {
    this.personalActual = personal;
  }

  /**
   *  metodo que muestra el formulario emergente para actualizar el personal y  guarda la referencia del personal que se desea actualizar
   */
  actualizarPersonal(id: any, personal: any) {
    this.mostrarFormularioEmergente = true;
    this.idpersonalActualizar = id;
    this.personalparaActualizar = personal;
  }
  /**
   * metodo que actualiza el registro del personal
   */
  actualizandoArregloPersonal(data: any) {
    this.personas = this.personas.map((personal) => {
      if (personal.uid == data.uid) {
        personal = data;
        return personal;
      } else return personal;
    });
    this.existeMsgActualizarExito = true;

    setTimeout(() => {
      this.existeMsgActualizarExito = false;
    }, 2000);
  }
  /**
   * metodo que verifica la el rol del personal logueado para restringir el acceso a ciertas acciones
   */
  restriccionPorRol() {
    const rol = this.StorageService.desencriptar('rol');

    if (rol == 'ADMIN_ROLE' || rol == 'AUX_ROLE') {
      this.accesoDenegado = false;
    }
  }
  asignarCamiones(id: string) {
    this.mostrarAsignacionDeCamiones = true;
    this.clienteId = id;
  }

  instantTranslation(key: string, params?: any) {
    return this.translateHelper.instantTranslation(key, params);
  }
}
