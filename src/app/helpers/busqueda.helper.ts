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
