import { Component } from '@angular/core';
import Contact from '../../models/conact.model';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalContacts: number = 0;
  searchQuery: string = '';

  toContacts:number = 0;
  formContacts:number = 0;

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts(this.currentPage,this.searchQuery)
      .pipe(
        catchError((error: any) => {
            this.contacts = [];
            console.info('Bad request error:', error.status); // Log the error for debugging
            return of(null);
        })
      )
      .subscribe((response:any) => {
        this.contacts = response.data;
        this.totalPages = response.last_page;
        this.totalContacts = response.total;
        this.formContacts = response.from;
        this.toContacts = response.to;
      });
  }

  search(): void {
    this.currentPage = 1; // Reiniciar a la primera página cuando cambia la búsqueda
    this.loadContacts();
  }

  previosPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadContacts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadContacts();
    }
  }

}
