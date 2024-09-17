import { Routes } from '@angular/router';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { ContactDetailComponent } from './views/contact-detail/contact-detail.component';

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
    path: 'contacts/:id',
    component: ContactDetailComponent }, // Contact Details
  {
    path: '**',
    redirectTo: '/contacts', // Redirigir cualquier ruta inválida a la página principal
  }
];
