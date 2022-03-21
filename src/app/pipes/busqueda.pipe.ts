import { Pipe, PipeTransform } from '@angular/core';
import { busqueda } from '../helpers/busqueda.helper';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(value: any[], page:number =0, search:string = '',isPersonal =false): any[]{

    if(isPersonal == false){
      const busquedaRegistros =  busqueda(value,search,page,isPersonal);
      return busquedaRegistros;

    }else{
      const busquedaRegistros =  busqueda(value,search,page,isPersonal);
      return busquedaRegistros;

    }
    
  }
  
}
