import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CambioContrasenaComponent } from './cambio-contrasena/cambio-contrasena.component';
import { EscannerQRComponent } from './escanner-qr/escanner-qr.component';
import { PersonalEliminadoComponent } from './personal-eliminado/personal-eliminado.component';
import { UsuariosEliminadosComponent } from './usuarios-eliminados/usuarios-eliminados.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroPersonalComponent } from './registro-personal/registro-personal.component';
import { RegistroRolComponent } from './registro-rol/registro-rol.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { VerPersonalComponent } from './ver-personal/ver-personal.component';
import { VerRolComponent } from './ver-rol/ver-rol.component';
import { VerVisitantesComponent } from './ver-visitantes/ver-visitantes.component';
import { VerTransportistasComponent } from './ver-transportistas/ver-transportistas.component';

const routes: Routes = [
  { path: '', component: RegistroUsuarioComponent },
  { path: 'registro-personal', component: RegistroPersonalComponent },
  { path: 'registro-rol', component: RegistroRolComponent },
  { path: 'ver-usuarios', component: VerUsuariosComponent },
  { path: 'ver-visitantes', component: VerVisitantesComponent },
  { path: 'ver-transportistas', component: VerTransportistasComponent },
  { path: 'ver-personal', component: VerPersonalComponent },
  { path: 'ver-rol', component: VerRolComponent },
  { path: 'usuarios-eliminados', component: UsuariosEliminadosComponent },
  { path: 'personal-eliminado', component: PersonalEliminadoComponent },
  { path: 'qr', component: EscannerQRComponent },
  { path: 'contrasena', component: CambioContrasenaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginasRoutingModule {}
