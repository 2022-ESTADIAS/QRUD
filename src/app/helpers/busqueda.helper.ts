export const busqueda = (value:any[],search:string,page:number,isPersonal:boolean = false) =>{

    if(isPersonal == false){
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
            personal.nombre.includes(search)  || 
            personal.telefono.includes(search)   ||
            personal.email.includes(search)  
            );
            console.log(searchArr)
            console.log(search.length)
            if(searchArr.length == 0) {
              return [{error:true,msg:"No se encontro Registro"}]
            }
      
            return searchArr;
          } else{
      
            return value.slice(page,page+ 10);
          }
    }

}
