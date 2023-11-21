import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomDetails } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rooms: RoomDetails[] | null= [];
  @Input() title: string = '';
  @Output() selectedRoom = new EventEmitter<RoomDetails>();
  @Output() editedRoom = new EventEmitter<RoomDetails>();
  @Output() deletedRoom = new EventEmitter<RoomDetails>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('on destroy is called');
  }

  selectRoom(room: RoomDetails) {
    this.selectedRoom.emit(room);
  }

  editRoom(room: RoomDetails) {
    this.editedRoom.emit(room);
  }

  deleteRoom(room: RoomDetails) {
    this.deletedRoom.emit(room);
  }
}
