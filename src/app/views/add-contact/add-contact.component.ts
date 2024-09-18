import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ContactFormComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  constructor(private contactService: ContactService, private router: Router) {}

  onFormSubmit(newContact: any): void {
    this.contactService.addContact(newContact).subscribe(() => {
      this.router.navigate(['/contacts',{query: newContact.name }]);
    });
  }

}
