import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id!: number;

  // id$: Observable<string> = this.router.params.pipe(
  //   map((params) => params['id'])
  // );
  id$ = this.router.paramMap.pipe(
    map((params) => params.get('id'))
  );

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // this.router.params.subscribe((params) => {
    //   this.id = params['id'];
    //   console.log(params);
    // });
    // this.router.paramMap.subscribe((params) => {
    //   params.get('id');
    // });
    // this.id = this.router.snapshot.params[''];
    // this.id$ = this.router.params.pipe(map((params) => params['id']));
  }
}
