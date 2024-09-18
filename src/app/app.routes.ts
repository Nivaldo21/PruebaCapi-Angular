import { Routes } from '@angular/router';
import { ContactListComponent } from './views/contact-list/contact-list.component';
import { ContactDetailComponent } from './views/contact-detail/contact-detail.component';
import { AddContactComponent } from './views/add-contact/add-contact.component';
import { EditContactComponent } from './views/edit-contact/edit-contact.component';

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
    path: 'contacts/add',
    component: AddContactComponent // Add new contact view
  },
  {
    path: 'contacts/update/:id',
    component: EditContactComponent // Add new contact view
  },
  {
    path: 'contacts/:id',
    component: ContactDetailComponent // Contact Details
  },
  {
    path: '**',
    redirectTo: '/contacts', // Redirigir cualquier ruta inválida a la página principal
  }
];
