import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoomDetails, RoomInventory } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
// , OnDestroy
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  hotelName = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = false;
  roomInventory: RoomInventory = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };
  roomList: RoomDetails[] = [];
  roomSelected!: RoomDetails;
  title: string = 'Room List';

  stream = new Observable((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  totalBytes: number = 0;

  subscription!: Subscription;

  error$: Subject<string> = new Subject<string>();
  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((error) => {
      console.log(error);
      this.error$.next(error.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));
  // Initating a service without using Angular's built in dependency injection
  // roomService = new RoomsService();

  // constructor(@SkipSelf() private roomsService: RoomsService) {}
  constructor(
    private roomsService: RoomsService,
    private configService: ConfigService
  ) {
    // console.log(this.roomsService.getRooms());
  }

  ngOnInit(): void {
    // console.log(this.headerComponent);
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (error) => console.log(`error ${error}`),
    });

    this.stream.subscribe((data) => console.log(data));
    // this.subscription = this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          console.log(`Total bytes loded: ${this.totalBytes}`);
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
          break;
        }
      }
    });
  }

  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent);
    this.headerComponent.title = 'Rooms view';

    // console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.last.title = 'Last title';
  }

  ngAfterViewChecked(): void {
    // this.headerComponent.title = 'Rooms view';
  }

  // ngOnDestroy(){
  //   if(this.subscription){
  //     this.subscription.unsubscribe();
  //   }
  // }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'New Room List';
  }

  addRoom() {
    const room: RoomDetails = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: [
        'https://unsplash.com/photos/brown-wooden-table-and-chairs-on-brown-wooden-deck-near-body-of-water-during-daytime-TAgGZWz6Qg8',
      ],
      checkinTime: new Date('03-Nov-2023'),
      checkoutTime: new Date('04-Nov-2023'),
      rating: 4.5,
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  onRoomSelect(room: RoomDetails) {
    console.log(room);
    this.roomSelected = room;
  }

  onRoomEdit(room: RoomDetails) {
    let updatedRoom: RoomDetails = room;
    updatedRoom.roomType = 'Deluxe Room';
    updatedRoom.amenities =
      'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen';
    updatedRoom.price = 111;
    updatedRoom.checkinTime = new Date('01-Nov-2023');
    updatedRoom.checkoutTime = new Date('02-Nov-2023');
    updatedRoom.rating = 2.3;
    this.roomsService.editRoom(updatedRoom).subscribe((data) => {
      this.roomList = data;
    });
  }

  onRoomDelete(room: RoomDetails) {
    this.roomsService.deleteRoom(room.roomNumber!).subscribe((data) => {
      this.roomList = data;
    });
  }
}
