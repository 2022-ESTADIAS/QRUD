import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscannerQRComponent } from './components/escanner-qr/escanner-qr.component';
import { CambioContrasenaComponent } from './components/formularios/cambio-contrasena/cambio-contrasena.component';
import { ContrasenaEmailComponent } from './components/formularios/contrasenas/contrasena-email/contrasena-email.component';
import { RestablecerContrasenaEmailComponent } from './components/formularios/contrasenas/restablecer-contrasena-email/restablecer-contrasena-email.component';
import { RegistroPersonalComponent } from './components/formularios/registro-personal/registro-personal.component';
import { RegistroRolComponent } from './components/formularios/registro-rol/registro-rol.component';
import { RegistroUsuarioComponent } from './components/formularios/registro-usuario/registro-usuario.component';
import { PersonalEliminadoComponent } from './components/tablas/personal-eliminado/personal-eliminado.component';
import { UsuariosEliminadosComponent } from './components/tablas/usuarios-eliminados/usuarios-eliminados.component';
import { VerPersonalComponent } from './components/tablas/ver-personal/ver-personal.component';
import { VerRolComponent } from './components/tablas/ver-rol/ver-rol.component';
import { VerUsuariosComponent } from './components/tablas/ver-usuarios/ver-usuarios.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"forget-password", component: ContrasenaEmailComponent},
  {path:"personal/email-pwd", component: RestablecerContrasenaEmailComponent},
  {path:"", component: PanelAdminComponent,canActivate:[LoginGuard],children:[
    {path:"", component:RegistroUsuarioComponent },
    {path:"registro-personal", component:RegistroPersonalComponent },
    {path:"registro-rol", component:RegistroRolComponent },
    {path:"ver-usuarios", component:VerUsuariosComponent },
    {path:"ver-personal", component:VerPersonalComponent },
    {path:"ver-rol", component:VerRolComponent},
    {path:"usuarios-eliminados", component:UsuariosEliminadosComponent },
    {path:"personal-eliminado", component:PersonalEliminadoComponent },
    {path:"qr", component:EscannerQRComponent},
    {path:"contrasena", component:CambioContrasenaComponent},
  ]},
  {path:"**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
