import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(value: any[], page:number =0, search:string = ''): any[]{

    if(search.trim() !== ''){
      const searchArr = value.filter((usuario:any) =>
      usuario.direccion.includes(search)   ||
      usuario.nombre.includes(search)  || 
      usuario.rfc.includes(search)   ||
      usuario.telefono.includes(search)   ||
      usuario.email.includes(search)  
      );
      console.log(searchArr)
      console.log(search.length)

       //cuando es un solo caracter retorna el arreglo inicial
     if( search.length == 1 ){  
      return value.slice(page,page +10);

    }

      return searchArr;
    } else{

      return value.slice(page,page+ 10);
    }

      
  }

}
