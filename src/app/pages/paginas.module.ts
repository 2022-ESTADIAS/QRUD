import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';

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
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BusquedaPipe } from '../pipes/busqueda.pipe';
import { ComponentesModule } from '../components/componentes.module';


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
    BusquedaPipe,
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    ZXingScannerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentesModule

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
export class PaginasModule { }
