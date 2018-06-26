import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { rutas } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProyectosComponent,
    DetalleProyectoComponent,
    NoEncontradoComponent,
    AcercadeComponent,
    ContactoComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
