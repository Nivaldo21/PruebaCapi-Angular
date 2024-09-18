import { Component } from '@angular/core';
import Contact from '../../models/conact.model';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemComponent } from '../../components/item/item.component';


@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ItemComponent],
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

  constructor(private contactService: ContactService, private router: Router,  private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.currentPage = +params['page'] || 1;
      this.loadContacts();
    });
  }

  loadContacts(): void {
    this.contactService.getContacts(this.currentPage,this.searchQuery)
      .pipe(
        catchError((error: any) => {
          this.contacts = [];
          this.totalPages = 0;
          this.totalContacts = 0;
          this.formContacts = 0;
          this.toContacts = 0;
          return of(null);
        })
      )
      .subscribe((response:any) => {
        if (response) {
          this.contacts = response.data;
          this.totalPages = response.last_page;
          this.totalContacts = response.total;
          this.formContacts = response.from;
          this.toContacts = response.to;
        }
      });
  }

  search(): void {
    this.currentPage = 1; // Reiniciar a la primera página cuando cambia la búsqueda
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery  || null, page: this.currentPage > 1 ? this.currentPage : null},
      queryParamsHandling: 'merge'
    });
    this.loadContacts();
  }

  previosPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { query: this.searchQuery  || null,page: this.currentPage > 1 ? this.currentPage : null },
        queryParamsHandling: 'merge'
      });
      this.loadContacts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { query: this.searchQuery || null, page: this.currentPage > 1 ? this.currentPage : null },
        queryParamsHandling: 'merge'
      });
      this.loadContacts();
    }
  }

  viewDetails(contactId: number): void {
    this.router.navigate(['/contacts', contactId]);
  }

  newContact():void{
    this.router.navigate(['/contacts/add']);
  }

  delete(contactId:number):void{
    if (window.confirm("Do you want to delete this contact?")) {
      this.contactService.deleteContact(contactId).subscribe(()=>{
        this.contacts = this.contacts.filter(contact => contact.id !== contactId);
      });
    }
  }

  update(contactId: number): void {
    this.router.navigate(['/contacts/update', contactId]);
  }

}
