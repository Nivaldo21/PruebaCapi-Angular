import { Routes } from '@angular/router';
import { ContactListComponent } from './views/contact-list/contact-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    component: ContactListComponent, // Página principal: Lista de contactos
  },
  {
    path: '**',
    redirectTo: '/contacts', // Redirigir cualquier ruta inválida a la página principal
  }
];
