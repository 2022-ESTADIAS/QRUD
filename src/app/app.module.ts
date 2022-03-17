import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { RegistroUsuarioComponent } from './components/formularios/registro-usuario/registro-usuario.component';
import { RegistroPersonalComponent } from './components/formularios/registro-personal/registro-personal.component';
import { RegistroRolComponent } from './components/formularios/registro-rol/registro-rol.component';
import { ErroresBackendComponent } from './components/alertas/errores-backend/errores-backend.component';
import { ExitoComponent } from './components/alertas/exito/exito.component';
import { ErroresFrontendComponent } from './components/alertas/errores-frontend/errores-frontend.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { VerUsuariosComponent } from './components/tablas/ver-usuarios/ver-usuarios.component';
import { VerPersonalComponent } from './components/tablas/ver-personal/ver-personal.component';
import { VerRolComponent } from './components/tablas/ver-rol/ver-rol.component';
import { ActualizarUsuarioComponent } from './components/formularios/emergentes/actualizar-usuario/actualizar-usuario.component';
import { ActualizarPersonalComponent } from './components/formularios/emergentes/actualizar-personal/actualizar-personal.component';
import { ActualizarRolComponent } from './components/formularios/emergentes/actualizar-rol/actualizar-rol.component';
import { EscannerQRComponent } from './components/escanner-qr/escanner-qr.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UsuariosEliminadosComponent } from './components/tablas/usuarios-eliminados/usuarios-eliminados.component';
import { PersonalEliminadoComponent } from './components/tablas/personal-eliminado/personal-eliminado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelAdminComponent,
    RegistroUsuarioComponent,
    RegistroPersonalComponent,
    RegistroRolComponent,
    ErroresBackendComponent,
    ExitoComponent,
    ErroresFrontendComponent,
    SpinnerComponent,
    VerUsuariosComponent,
    VerPersonalComponent,
    VerRolComponent,
    ActualizarUsuarioComponent,
    ActualizarPersonalComponent,
    ActualizarRolComponent,
    EscannerQRComponent,
    UsuariosEliminadosComponent,
    PersonalEliminadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
