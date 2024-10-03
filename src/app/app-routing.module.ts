import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorServidorComponent } from './components/error-servidor/error-servidor.component';
import { ContrasenaEmailComponent } from './components/formularios/contrasenas/contrasena-email/contrasena-email.component';
import { RestablecerContrasenaEmailComponent } from './components/formularios/contrasenas/restablecer-contrasena-email/restablecer-contrasena-email.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { LoginComponent } from './pages/login/login.component';

import { ErrorServidorGuard } from './guards/error-servidor.guard';
import { LoginGuard } from './guards/login.guard';
/* import { EscannerUsuarioComponent } from './pages/escanner-usuario/escanner-usuario.component'; */
import { EmailGuard } from './guards/email.guard';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { EscannerQRComponent } from './pages/escanner-qr/escanner-qr.component';
import { RegistroPersonalComponent } from './pages/registro-personal/registro-personal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'registro-cliente', component: RegistroPersonalComponent },
  { path: 'escaner', component: EscannerQRComponent },
  { path: 'forget-password', component: ContrasenaEmailComponent },
  {
    path: 'error',
    component: ErrorServidorComponent,
    canActivate: [ErrorServidorGuard],
  },
  {
    path: 'personal/email-pwd',
    component: RestablecerContrasenaEmailComponent,
    canActivate: [EmailGuard],
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./modulo-cliente/modulo-cliente.module').then(
        (m) => m.ModuloClienteModule
      ),
  },

  {
    path: '',
    component: PanelAdminComponent,
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./pages/paginas.module').then((m) => m.PaginasModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
