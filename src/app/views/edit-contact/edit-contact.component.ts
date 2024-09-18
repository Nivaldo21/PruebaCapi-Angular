import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactDetails } from '../../models/conact.model';
import { group } from '@angular/animations';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent {
  contactForm!: FormGroup;
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del contacto de la URL
    this.route.paramMap.subscribe(params => {
      this.contactId = +params.get('id')!;
      this.loadContactDetails();
    });

    // Inicializar el formulario con los campos vacíos
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      notes: [''],
      birthday: ['', Validators.required],
      company: [''],
      website: [''],
      phones: this.fb.array([]),   // FormArray para phones
      emails: this.fb.array([]),   // FormArray para emails
      addresses: this.fb.array([]) // FormArray para addresses
    });
  }

  // Cargar los detalles del contacto desde el servicio
  loadContactDetails(): void {
    this.contactService.getContactDetails(this.contactId).subscribe((contact: ContactDetails) => {
      // Llenar el formulario con los datos del contacto
      this.contactForm.patchValue({
        name: contact.name,
        notes: contact.notes,
        birthday: contact.birthday,
        company: contact.company,
        website: contact.website,
      });
      if(contact.phones) this.setFormArrayData('phones', contact.phones);
      if(contact.emails) this.setFormArrayData('emails', contact.emails);
      if(contact.addresses) this.setFormArrayData('addresses', contact.addresses);
    });
  }

  // Función para rellenar un FormArray
  setFormArrayData(arrayName: string, items: any[],realNamePropMap?: string): void {
    const formArray = this.contactForm.get(arrayName) as FormArray;
    items.forEach(item => {
      formArray.push(this.fb.group(item));
    });
  }

  // Enviar el formulario actualizado
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(
        (response: any) => {
          console.log('Contact updated successfully', response);
          this.router.navigate(['/contacts']);
        }
      );
    }
  }

  // Métodos para añadir y quitar teléfonos, emails y direcciones
  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  get emails(): FormArray {
    return this.contactForm.get('emails') as FormArray;
  }

  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addPhone(): void {
    this.phones.push(this.fb.group({ number: ['', Validators.required] }));
  }

  addEmail(): void {
    this.emails.push(this.fb.group({ email: ['', [Validators.required, Validators.email]] }));
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
