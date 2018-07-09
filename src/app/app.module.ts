import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { DetalleProyectoComponent } from './components/detalle-proyecto/detalle-proyecto.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

import { ProyectosService } from './providers/proyectos.service';

import { NgxMdModule } from 'ngx-md';

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
    AdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMdModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [LoginGuard, NoLoginGuard, ProyectosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
