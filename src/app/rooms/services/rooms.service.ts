import { Inject, Injectable } from '@angular/core';
import { RoomDetails } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../../app/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  // roomList: RoomDetails[] = [
  //   {
  //     roomNumber: 1,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 500,
  //     photos: [
  //       'https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8',
  //     ],
  //     checkinTime: new Date('03-Nov-2023'),
  //     checkoutTime: new Date('04-Nov-2023'),
  //     rating: 4.5,
  //   },
  //   {
  //     roomNumber: 2,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 1000,
  //     photos: [
  //       'https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8',
  //     ],
  //     checkinTime: new Date('06-Nov-2023'),
  //     checkoutTime: new Date('11-Nov-2023'),
  //     rating: 2.84564,
  //   },
  //   {
  //     roomNumber: 3,
  //     roomType: 'Private Suite',
  //     amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 1500,
  //     photos: [
  //       'https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8',
  //     ],
  //     checkinTime: new Date('06-Nov-2023'),
  //     checkoutTime: new Date('11-Nov-2023'),
  //     rating: 3.2,
  //   },
  // ];

  roomList: RoomDetails[] = [];

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(`Environment ${this.config.apiEndPoint}`);
    console.log('Rooms service initialised...');
  }

  // headers = new HttpHeaders({ token: '12345abcd' });
  getRooms$ = this.http
    .get<RoomDetails[]>('/api/rooms')
    .pipe(shareReplay(1));

  getRooms() {
    return this.http.get<RoomDetails[]>('/api/rooms');
  }

  addRoom(room: RoomDetails) {
    return this.http.post<RoomDetails[]>('/api/rooms', room);
  }

  editRoom(room: RoomDetails) {
    return this.http.put<RoomDetails[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(roomNumber: string) {
    return this.http.delete<RoomDetails[]>(`/api/rooms/${roomNumber}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      { reportProgress: true }
    );
    return this.http.request(request);
  }
}
