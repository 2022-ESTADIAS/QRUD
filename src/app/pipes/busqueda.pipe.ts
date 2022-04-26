import { Pipe, PipeTransform } from '@angular/core';
import { busqueda } from '../helpers/busqueda.helper';

/**
 * pipe que realiza la busqueda de una cadena de texto en un arreglo de objetos y devuelve los objetos que coincidan con la busqueda realizada. Como segunda accion realiza el proceso de paginacion de los registros
 */
@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {
  /**
   * metodo que realiza la busqueda y la paginacion de registros 
   * @param registros recibe un arreglo de registros
   * @param buscando recibe el valor de busqueda
   * @param pagina recibe el numero de pagina a mostrar
   * @param isPersonal recibe el valor de si es personal o no
   */
  transform(registros: any[], pagina:number =0, buscando:string = '',isPersonal =false): any[]{

    if(isPersonal == false){
      const busquedaRegistros =  busqueda(registros,buscando,pagina,isPersonal);
      return busquedaRegistros;

    }else{
      const busquedaRegistros =  busqueda(registros,buscando,pagina,isPersonal);
      return busquedaRegistros;

    }
    
  }
  
}
