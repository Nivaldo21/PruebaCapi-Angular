import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  contactForm!: FormGroup;
  newEmail: string = '';
  newPhone: string = '';

  constructor( private fb: FormBuilder, private contactService: ContactService, private router: Router){}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      notes: ['', [Validators.nullValidator]],
      birthday: ['', [Validators.required]],
      website: ['', [Validators.nullValidator, Validators.pattern('https?://.+')]],
      company: ['', [Validators.nullValidator, Validators.maxLength(255)]],
      phones: this.fb.array([]),
      emails: this.fb.array([]),
      addresses: this.fb.array([]),
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(
        (response:any) => {
          this.router.navigate(['/contacts']);
        }
      );
    }
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  addPhone(): void {
    const phoneGroup = this.fb.group({
      phone: ['', Validators.required]
    });
    this.phones.push(phoneGroup);
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  addEmail(): void {
    const emailGroup = this.fb.group({
      email: ['', Validators.required]
    });
    this.emails.push(emailGroup);
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    const addressGroup = this.fb.group({
      street: ['', [Validators.required, Validators.maxLength(255)]],
      city: ['', [Validators.required, Validators.maxLength(255)]],
      state: ['', [Validators.required, Validators.maxLength(255)]],
      zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      country: ['', [Validators.required, Validators.maxLength(255)]]
    });
    this.addresses.push(addressGroup);
  }

}
