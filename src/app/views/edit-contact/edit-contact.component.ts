import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactDetails } from '../../models/conact.model';
import { group } from '@angular/animations';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule,ContactFormComponent],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {
  contactId!: number;
  initialData: any;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contactId = +params.get('id')!;
      this.loadContactDetails();
    });
  }

  loadContactDetails(): void {
    this.contactService.getContactDetails(this.contactId).subscribe(contact => {
      this.initialData = contact;
    });
  }

  onFormSubmit(updatedContact: any): void {
    this.contactService.updateContact(this.contactId, updatedContact).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }
}
