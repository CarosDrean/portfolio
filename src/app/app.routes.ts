import { Routes, RouterModule } from '@angular/router';

import {
  ProyectosComponent,
  DetalleProyectoComponent,
  AcercadeComponent,
  ContactoComponent,
  NoEncontradoComponent,
  AdminComponent
} from './components/index.paginas';

const routes: Routes = [
  { path: 'home', component: ProyectosComponent },
  { path: 'detalle', component: DetalleProyectoComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'noencontrado', component: NoEncontradoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'noencontrado' },

  // { path: 'path/:routeParam', component: MyComponent },
  // { path: 'staticPath', component: ... },
  // { path: '**', component: ... },
  // { path: 'oldPath', redirectTo: '/staticPath' },
  // { path: ..., component: ..., data: { message: 'Custom' }
];

export const rutas = RouterModule.forRoot(routes, {useHash: true});
