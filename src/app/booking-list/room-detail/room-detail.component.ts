import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../booking/booking.service';
import { RoomDetails } from '../../rooms/rooms';

@Component({
  selector: 'hinv-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
})
export class RoomDetailComponent implements OnInit {
  @Input() room!: RoomDetails;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    console.log('room details');
  }

  selectRoom(room: RoomDetails) {
    console.log(room);
    this.bookingService.roomSelected.next(room);
  }
}
