import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ComponentesModule } from './components/componentes.module';
import { ContrasenaEmailComponent } from './components/formularios/contrasenas/contrasena-email/contrasena-email.component';
import { ErrorServidorComponent } from './components/error-servidor/error-servidor.component';
import { LoginComponent } from './pages/login/login.component';
import { PanelAdminComponent } from './pages/panel-admin/panel-admin.component';
import { RestablecerContrasenaEmailComponent } from './components/formularios/contrasenas/restablecer-contrasena-email/restablecer-contrasena-email.component';
import { ModuloClienteModule } from './modulo-cliente/modulo-cliente.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelAdminComponent,
    ContrasenaEmailComponent,
    RestablecerContrasenaEmailComponent,
    ErrorServidorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentesModule,
    ModuloClienteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
