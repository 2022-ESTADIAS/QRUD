import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit, OnDestroy {
  ocultarForm:boolean = false;
  //controlar las opciones del menu
  mostrarOpcionesMenuUsuario:boolean = false; 
  mostrarOpcionesMenuPersonal:boolean = false; 
  mostrarOpcionesMenuRol:boolean = false; 
  mostrarOpcionesMenuQR:boolean = false; 
  mostrarOpcionesMenuContrasena:boolean = false; 
  expandirMenu:boolean = false;
  sidebar:any;
  //controla las rutas del personal logueado
  esAdmin:boolean = false;
  esMaster:boolean = false;
  esAux:boolean = false;

  //rutas del sistema  
  rutas:any[] = [];

  rutasMaster:any[] = [
    [{ruta:'',nombre:'Crear '},
    {ruta:'/ver-usuarios',nombre:'Ver'},
     {ruta:'/usuarios-eliminados',nombre:'Eliminados'}], //fin rutas usuario
     [{ruta:'/registro-personal',nombre:'Registrar '},
     {ruta:'/ver-personal',nombre:'Ver'},
     {ruta:'/personal-eliminado',nombre:'Eliminados'}], //fin rutas personal
     [{ruta:'/registro-rol',nombre:'Crear'},  
     {ruta:'/ver-rol',nombre:'Ver'},], //fin rutas rol
    ];
    
    rutasAdmin:any[] = [
      [
        {ruta:'/ver-usuarios',nombre:'Ver'},
        {ruta:'',nombre:'Crear'},
        {ruta:'/usuarios-eliminados',nombre:'Eliminados'}, //rutas usuario
      ],
      [
        {ruta:'/ver-personal',nombre:'Ver'},
      ],
  ];
  rutasAux:any[] = [
    {ruta:'',nombre:'Crear'},
    {ruta:'/ver-usuarios',nombre:'Ver'},
  ];

  nombrePersonal:string = '';
  inicial:string ='';

  constructor(
    private AuthService: AuthService,
    private StorageService: StorageService,
  ) { }
  ngOnDestroy(): void {
    this.sidebar?.classList.remove("body-pd")
  }

  ngOnInit(): void {
    this.obtenerNombre();
    this.verRol();
    this.generarColorRandom();
  }

  mostrarOpcionesUsuario(){
    this.mostrarOpcionesMenuUsuario = !this.mostrarOpcionesMenuUsuario;
  } 

  mostrarOpcionesPersonal(){
    this.mostrarOpcionesMenuPersonal = !this.mostrarOpcionesMenuPersonal;
  } 
  mostrarOpcionesRol(){
    this.mostrarOpcionesMenuRol = !this.mostrarOpcionesMenuRol;
  } 
  mostrarOpcionesQR(){
    this.mostrarOpcionesMenuQR = !this.mostrarOpcionesMenuQR;
  } 
  mostrarOpcionesContrasena(){
    this.mostrarOpcionesMenuContrasena = !this.mostrarOpcionesMenuContrasena;
  } 

  mostrarMenu(){
    this.expandirMenu = !this.expandirMenu;
    this.sidebar = document.querySelector("body#body-pd");
    if(this.expandirMenu){
      this.sidebar?.classList.add("body-pd")
      
    }else{
      this.sidebar?.classList.remove("body-pd")
      
    }
  }

  verRol(){
    const rol = this.StorageService.desencriptar("rol");
    console.log(rol)
    if(rol =='MASTER_ROLE'){
      this.esMaster =  true;
      this.esAdmin = false;
      this.esAux = false;
      this.rutas = this.rutasMaster;
      
    }else if(rol =='ADMIN_ROLE'){
      this.esAdmin = true;
      this.esMaster =  false;
      this.esAux = false;
      this.rutas = this.rutasAdmin;

    }
    else{
      this.esAdmin = false;
      this.esMaster =  false;
      this.esAux = true;
      this.rutas = this.rutasAux;
    }

  }

  logout(){
    this.AuthService.logout();

  }
  obtenerNombre(){
   this.nombrePersonal = this.StorageService.desencriptar("nombre");

   this.inicial = this.nombrePersonal.split("")[0].toUpperCase();
   console.log(this.inicial);
  }

  generarColorRandom(){
    setInterval(() => {
      const color = Math.floor(Math.random() * 16777215).toString(16);
      const colorRandom = "#" + ("000000" + color).slice(-6); 
      console.log(colorRandom);
      (document.querySelector("#cambioColor") as any).style.backgroundColor = colorRandom;

    },3000)
    
  }


}
