import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // to create another instance of the service since by default service is initalised a singleton
  providers: [RoomsService],
})
export class EmployeeComponent implements OnInit {
  empName: string = 'Avni';

  constructor(@Self() private roomsService: RoomsService) {}

  ngOnInit(): void {}
}
