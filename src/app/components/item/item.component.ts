import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Contact from '../../models/conact.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() contact!: Contact;
  @Input() onViewDetails!: (id: number) => void;
  @Input() onUpdate!: (id: number) => void;
  @Input() onDelete!: (id: number) => void;
}
