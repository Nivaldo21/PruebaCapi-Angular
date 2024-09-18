import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import Contact, { ContactDetails } from '../models/conact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) { }

  // Method to obtain the list of contacts with paging
  getContacts(page: number = 1, searchQuery: string = ''): Observable<Contact> {
    let params = new HttpParams();
    if(searchQuery){
      params = params.set('page', page.toString()).set('query', searchQuery);
    }else{
      params = params.set('page', page.toString());
    }
    const api = searchQuery ? `${this.apiUrl}/search` : this.apiUrl;
    return this.http.get<Contact>(api, { params });
  }

  getContactDetails(contactId: number): Observable<ContactDetails>{
    return this.http.get<ContactDetails>(`${this.apiUrl}/${contactId}`);
  }

  addContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  deleteContact(contactId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${contactId}`);
  }
}
