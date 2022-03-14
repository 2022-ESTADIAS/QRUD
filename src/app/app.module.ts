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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PanelAdminComponent,
    RegistroUsuarioComponent,
    RegistroPersonalComponent,
    RegistroRolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
