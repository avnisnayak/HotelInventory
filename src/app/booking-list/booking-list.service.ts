import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from './booking-detail/booking-detail';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingListService {

  constructor(private httpClient: HttpClient) {}
}
