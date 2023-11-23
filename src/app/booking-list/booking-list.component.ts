import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookingListService } from './booking-list.service';
import { Booking } from './booking-detail/booking-detail';
import { Observable, Subscription, catchError, mergeMap, of } from 'rxjs';
import { BookingService } from '../booking/booking.service';
import { RoomDetails } from '../rooms/rooms';

@Component({
  selector: 'hinv-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit, OnDestroy {
  // loadBookings: boolean;
  // bookingList$!: Observable<Booking[]>;
  bookingList!: Booking[];
  roomList!: RoomDetails[];
  subscription!: Subscription;

  selectRoom!: RoomDetails;
  newIndex: number = -1;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    // this.bookingList$ = this.bookingService.getBookings$.pipe();

    this.subscription = this.bookingService.getBookings$.subscribe(
      (bookings) => {
        this.bookingList = bookings;
      }
    );

    this.subscription = this.bookingService.getRooms$.subscribe((rooms) => {
      this.roomList = rooms;
      this.selectRoom = rooms[0];
    });

    this.bookingService.bookingAdded.subscribe((data: Booking) => {
      if (data) {
        this.bookingList = [...this.bookingList, data];
        this.newIndex = this.bookingList.length;
      }
    });

    this.bookingService.roomSelected.subscribe((data: RoomDetails) => {
      if (data) {
        this.selectRoom = data;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
