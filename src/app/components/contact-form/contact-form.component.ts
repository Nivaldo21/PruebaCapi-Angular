import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  @Input() initialData: any;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      notes: [''],
      birthday: ['', Validators.required],
      company: [''],
      website: [''],
      phones: this.fb.array([]),
      emails: this.fb.array([]),
      addresses: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.initialData) {
      this.updateFormWithInitialData();
    }
  }

  updateFormWithInitialData(): void {
    this.contactForm.patchValue({
      name: this.initialData.name || '',
      notes: this.initialData.notes || '',
      birthday: this.initialData.birthday || '',
      company: this.initialData.company || '',
      website: this.initialData.website || ''
    });

    if (this.initialData.phones) this.setFormArrayData('phones', this.initialData.phones);
    if (this.initialData.emails) this.setFormArrayData('emails', this.initialData.emails);
    if (this.initialData.addresses) this.setFormArrayData('addresses', this.initialData.addresses);
  }

  setFormArrayData(arrayName: string, items: any[]): void {
    const formArray = this.contactForm.get(arrayName) as FormArray;
    items.forEach(item => {
      formArray.push(this.fb.group(item));
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
    }
  }

  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phones.push(this.fb.group({ number: ['', Validators.required] }));
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  addEmail(): void {
    this.emails.push(this.fb.group({ email: ['', Validators.required] }));
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required]
    }));
  }
}
