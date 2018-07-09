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
  { path: 'detalle/:id', component: DetalleProyectoComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'noencontrado', component: NoEncontradoComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: '/noencontrado' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
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
