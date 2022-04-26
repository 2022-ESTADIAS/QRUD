import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoGuard } from './activo.guard';
import { ActivoComponent } from './activo/activo.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { EscannerUsuarioComponent } from './escanner-usuario/escanner-usuario.component';
import { RegistroPublicoComponent } from './registro-publico/registro-publico.component';


const routes: Routes = [
  {path:"scanner", component: EscannerUsuarioComponent},
  {path:"registro", component: RegistroPublicoComponent},
  {path:"bienvenido", component: BienvenidaComponent},
  {path:"activo/:id", component: ActivoComponent,canActivate:[ActivoGuard]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloClienteRoutingModule { }
