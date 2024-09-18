import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { ContactDetails } from '../../models/conact.model';
import { CommonModule, JsonPipe } from '@angular/common';


@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [JsonPipe,CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contactId: number = 0;
  contactDetail!: ContactDetails;

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.contactId = +params.get('id')!;
      this.loadContactDetails();
    });
  }

  loadContactDetails():void{
    this.contactService.getContactDetails(this.contactId).subscribe((response:any) => {
        this.contactDetail = response;
        console.log( this.contactDetail);
    });
  }

  return():void {
    this.router.navigate(['/contacts']);
  }

  edit():void{
    this.router.navigate(['/contacts/update',this.contactId]);
  }
}
