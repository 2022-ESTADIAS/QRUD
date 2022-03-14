import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPersonalComponent } from './components/formularios/registro-personal/registro-personal.component';
import { RegistroRolComponent } from './components/formularios/registro-rol/registro-rol.component';
import { RegistroUsuarioComponent } from './components/formularios/registro-usuario/registro-usuario.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"", component: PanelAdminComponent,canActivate:[LoginGuard],children:[
    {path:"", component:RegistroUsuarioComponent },
    {path:"registro-personal", component:RegistroPersonalComponent },
    {path:"registro-rol", component:RegistroRolComponent },
  ]},
  {path:"**", redirectTo: ""},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
