import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ProyectosComponent,
  DetalleProyectoComponent,
  AcercadeComponent,
  ContactoComponent,
  NoEncontradoComponent,
  AdminComponent,
  LoginComponent
} from './components/index.paginas';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';

const routes: Routes = [
  { path: 'home', component: ProyectosComponent },
  { path: 'detalle', component: DetalleProyectoComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoLoginGuard] },
  { path: 'noencontrado', component: NoEncontradoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: true,
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
