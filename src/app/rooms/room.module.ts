import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { ROUTE_ROOM_CONFIG, ROUTE_SERVICE_CONFIG } from '../services/routeConfig.service';

@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddComponent,
  ],
  imports: [CommonModule, RoomRoutingModule, FormsModule, HeaderModule],
  providers: [
    {
      provide: ROUTE_SERVICE_CONFIG,
      useValue: ROUTE_ROOM_CONFIG,
    },
  ],
})
export class RoomModule {}
