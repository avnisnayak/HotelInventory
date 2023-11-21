import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';

const routes: Routes = [
  { path: 'add', component: RoomsAddComponent },
  {
    path: '',
    component: RoomsComponent,
    children: [{ path: ':id', component: RoomsBookingComponent }],
  },
  // { path: 'room/:roomNumber', component: RoomsBookingComponent },
  // { path: 'room/:id', component: RoomsBookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRoutingModule {}
