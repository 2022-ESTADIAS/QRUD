import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentesRoutingModule } from './componentes-routing.module';

import { ErroresBackendComponent } from '../components/alertas/errores-backend/errores-backend.component';
import { ExitoComponent } from '../components/alertas/exito/exito.component';
import { ErroresFrontendComponent } from '../components/alertas/errores-frontend/errores-frontend.component';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ModalComponent } from '../components/modal/modal.component';
import { NoEncontradoComponent } from '../components/no-encontrado/no-encontrado.component';
import { PaginacionComponent } from '../components/paginacion/paginacion.component';
import { BuscadorComponent } from '../components/buscador/buscador.component';

import { ActualizarUsuarioComponent } from '../components/formularios/emergentes/actualizar-usuario/actualizar-usuario.component';
import { ActualizarPersonalComponent } from '../components/formularios/emergentes/actualizar-personal/actualizar-personal.component';
import { ActualizarRolComponent } from '../components/formularios/emergentes/actualizar-rol/actualizar-rol.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DriverRegulationsComponent } from './driver-regulations/driver-regulations.component';
import { TranslateComponent } from './translate/translate.component';
import { AsignarCamionesComponent } from './formularios/emergentes/asignar-camiones/asignar-camiones.component';

@NgModule({
  declarations: [
    ErroresBackendComponent,
    ExitoComponent,
    ErroresFrontendComponent,
    SpinnerComponent,
    ActualizarUsuarioComponent,
    ActualizarPersonalComponent,
    ActualizarRolComponent,
    PaginacionComponent,
    BuscadorComponent,
    NoEncontradoComponent,
    ModalComponent,
    DriverRegulationsComponent,
    TranslateComponent,
    AsignarCamionesComponent,
  ],
  exports: [
    ErroresBackendComponent,
    ExitoComponent,
    ErroresFrontendComponent,
    SpinnerComponent,
    ActualizarUsuarioComponent,
    ActualizarPersonalComponent,
    ActualizarRolComponent,
    PaginacionComponent,
    BuscadorComponent,
    NoEncontradoComponent,
    ModalComponent,
    DriverRegulationsComponent,
    TranslateComponent,
    AsignarCamionesComponent,
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentesModule {}
