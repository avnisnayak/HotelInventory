import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  // all the components loaded under this container will start using the instance declared here - using @host
  // constructor(@Host() private roomsService: RoomsService) { }
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Avniiiii';
  }
}
