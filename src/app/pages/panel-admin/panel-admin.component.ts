import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { QRUDService } from 'src/app/services/qrud.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {
  ocultarForm:boolean = false;
  //controlar las opciones del menu
  mostrarOpcionesMenuUsuario:boolean = false; 
  mostrarOpcionesMenuPersonal:boolean = false; 
  mostrarOpcionesMenuRol:boolean = false; 
  mostrarOpcionesMenuQR:boolean = false; 
  mostrarOpcionesMenuContrasena:boolean = false; 
  expandirMenu:boolean = false;

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
        {ruta:'/ver-usuarios',nombre:'Ver Usuario'},
        {ruta:'',nombre:'Crear Usuario'},
        {ruta:'/usuarios-eliminados',nombre:'Ver Usuarios Eliminados'}, //rutas usuario
      ],
      [
        {ruta:'/ver-personal',nombre:'Ver Personal'},
      ],
  ];
  rutasAux:any[] = [
    {ruta:'',nombre:'Crear Usuario'},
    {ruta:'/ver-usuarios',nombre:'Ver Usuario'},
  ];

  
  constructor(
    private AuthService: AuthService,
    private StorageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.verRol();
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


}
