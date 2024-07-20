import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from '../components/componentes.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { PaginasRoutingModule } from './paginas-routing.module';

import { BusquedaPipe } from '../pipes/busqueda.pipe';

//paginas
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
/* import { EscannerUsuarioComponent } from './escanner-usuario/escanner-usuario.component'; */

@NgModule({
  declarations: [
    CambioContrasenaComponent,
    EscannerQRComponent,
    PersonalEliminadoComponent,
    UsuariosEliminadosComponent,
    RegistroUsuarioComponent,
    RegistroPersonalComponent,
    RegistroRolComponent,
    VerUsuariosComponent,
    VerPersonalComponent,
    VerRolComponent,
    BusquedaPipe /* ,
    EscannerUsuarioComponent, */,
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentesModule,
  ],
  exports: [
    CambioContrasenaComponent,
    EscannerQRComponent,
    PersonalEliminadoComponent,
    UsuariosEliminadosComponent,
    RegistroUsuarioComponent,
    RegistroPersonalComponent,
    RegistroRolComponent,
    VerUsuariosComponent,
    VerPersonalComponent,
    VerRolComponent,
  ],
})
export class PaginasModule {}
