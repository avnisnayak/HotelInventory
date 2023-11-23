import { Component, Input } from '@angular/core';
import { Booking } from './booking-detail';

@Component({
  selector: 'hinv-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
})
export class BookingDetailComponent {
  @Input() booking!: Booking;
  @Input() isNew: boolean = false;
}
