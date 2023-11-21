import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../booking-list/booking-detail/booking-detail';
import { Subject, shareReplay } from 'rxjs';
import { RoomDetails } from '../rooms/rooms';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public bookingAdded: Subject<Booking>;
  public roomSelected: Subject<RoomDetails>;

  constructor(private httpClient: HttpClient) {
    this.bookingAdded = new Subject<Booking>();
    this.roomSelected = new Subject<RoomDetails>();
  }

  // bookRoom(booking: any) {
  //   return this.httpClient.post(
  //     'https://jsonplaceholder.typicode.com/posts',
  //     booking
  //   );
  // }

  getBooking(bookingId: string) {
    return this.httpClient.get<Booking>(`/api/booking/${bookingId}`);
  }

  bookRoom(booking: Booking) {
    console.log(booking);
    return this.httpClient.post<Booking>('/api/booking', booking);
  }

  getBookings$ = this.httpClient
    .get<Booking[]>('/api/booking')
    .pipe(shareReplay(1));

  getRooms$ = this.httpClient
    .get<RoomDetails[]>('/api/rooms')
    .pipe(shareReplay(1));
}
