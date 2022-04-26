import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuloClienteRoutingModule } from './modulo-cliente-routing.module';
import { EscannerUsuarioComponent } from './escanner-usuario/escanner-usuario.component';
import { RegistroPublicoComponent } from './registro-publico/registro-publico.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../components/componentes.module';
import { ActivoComponent } from './activo/activo.component';



@NgModule({
  declarations: [
    EscannerUsuarioComponent,
    RegistroPublicoComponent,
    BienvenidaComponent,
    ActivoComponent
  ],
  imports: [
    CommonModule,
    ModuloClienteRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentesModule
  ],
  exports: [
    EscannerUsuarioComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ModuloClienteModule { }
