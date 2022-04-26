/**
 * Este helper realiza las operaciones de busqueda y paginacion de los registros retornando un arreglo con un maximo de 10 registros por pagina. Con respecto a la busqueda  para los usuarios se puede realizar por nombre,direccion,rfc,telefono,email, mientras que para el personal se utilizan las propiedades de nombre,telefono o email.
 * La busqueda es sencible a mayusculas y minusculas por lo que esta funcion se encarga de convertir todo a minusculas para realizar la busqueda. finalmente sino encuentra un registro retorna un arreglo indicando que no se encontro ningun registro.
 * @param value recibe el arreglo para ser paginado
 * @param search recibe la busqueda hecha por el personal
 * @param page recibe la pagina actual del paginado
 * @param isPersonal bandera la cual si es verdadera realiza la busqueda en las propiedades del personal
 * @returns 
 */
export const busqueda = (value:any[],search:string,page:number,isPersonal:boolean = false) =>{
    if(isPersonal == false){
        if(search.trim() !== ''){
            const searchArr = value.filter((usuario:any) =>
            usuario.nombre.includes(search.toLowerCase())  || 
            usuario.direccion.includes(search.toLowerCase())   ||
            usuario.rfc.includes(search.toLowerCase())   ||
            usuario.telefono.includes(search.toLowerCase())   ||
            usuario.email.includes(search.toLowerCase())  
            );
            if(searchArr.length == 0) {
              return [{error:true,msg:"No se encontro Registro"}]
            }
            return searchArr;
          } else{
      
            return value.slice(page,page+ 10);
          }
    }else{
        if(search.trim() !== ''){
            const searchArr = value.filter((personal:any) =>
            personal.nombre.includes(search.toLowerCase())  || 
            personal.telefono.includes(search.toLowerCase())   ||
            personal.email.includes(search.toLowerCase())  
            );
            if(searchArr.length == 0) {
              return [{error:true,msg:"No se encontro Registro"}]
            }
            return searchArr;
          } else{
      
            return value.slice(page,page+ 10);
          }
    }
}
