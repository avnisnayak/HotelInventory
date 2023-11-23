import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  EmailValidator,
  FormGroupDirective,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  Observable,
  exhaustMap,
  map,
  mergeMap,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { BookingService } from './booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Booking } from '../booking-list/booking-detail/booking-detail';
import { RoomDetails } from '../rooms/rooms';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit, OnChanges {
  @Input() selectRoom!: RoomDetails;
  bookingForm!: FormGroup;
  filteredOptions!: Observable<string[]>;
  options: string[] = ['Reserved', 'Booked', 'Cancelled'];
  loading: boolean = true;

  get guestList() {
    return this.bookingForm.get('guestList') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // window.setTimeout(() => {
    this.initBookingForm();
    this.bookingForm.patchValue(this.getDefaultBookingData());
    //   this.loading = false;
    // }, 4000);
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   console.log(data);
    //   this.bookingService.bookRoom(data).subscribe((data) => {});
    // });

    // this.bookingForm.valueChanges
    //   .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));

    // this.bookingForm.valueChanges
    //   .pipe(switchMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));
    // this.bookingForm.valueChanges
    //   .pipe(exhaustMap((data) => this.bookingService.bookRoom(data)))
    //   .subscribe((data) => console.log(data));

    this.filteredOptions = this.bookingForm.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.loading = true;
    // window.setTimeout(() => {
    this.initBookingForm();
    this.bookingForm.reset(this.getDefaultBookingData());
    // this.loading = false;
    // }, 4000);
  }

  initBookingForm() {
    if (this.bookingForm == null) {
      this.bookingForm = this.formBuilder.group(
        {
          // use either syntax
          // roomId: new FormControl(
          //   { disabled: true },
          //   { validators: [Validators.required] }
          // ),
          roomId: new FormControl(
            { value: this.selectRoom.roomNumber, disabled: true },
            {
              // updateOn: 'blur',
              validators: [Validators.required],
            }
          ),
          guestEmail: new FormControl('', {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          }),
          checkinDate: new FormControl('', {
            validators: [Validators.required],
          }),
          checkoutDate: new FormControl('', {
            validators: [Validators.required],
          }),
          bookingStatus: new FormControl('', {
            validators: [Validators.required],
          }),
          bookingAmount: new FormControl('', {
            validators: [Validators.required],
          }),
          bookingDate: new FormControl(''),
          mobileNumber: new FormControl('', { updateOn: 'blur' }),
          guestName: new FormControl('', {
            updateOn: 'blur',
            validators: [Validators.required, Validators.minLength(5)],
          }),
          guestAddress: this.formBuilder.group({
            addressLine1: new FormControl('', {
              validators: [Validators.required, Validators.minLength(5)],
            }),
            addressLine2: new FormControl(''),
            // addressLine3: new FormControl(''),
            city: new FormControl('', {
              validators: [Validators.required],
            }),
            state: new FormControl('', {
              validators: [Validators.required],
            }),
            country: new FormControl('', {
              validators: [Validators.required],
            }),
            zipCode: new FormControl('', {
              validators: [Validators.required],
            }),
          }),
          // guestCount: new FormControl(''),
          guestList: this.formBuilder.array([this.addGuestControl()], {
            validators: [Validators.minLength(1), Validators.maxLength(4)],
          }),
        },
        { updateOn: 'blur', validators: Validators.required }
      );
    }
  }

  private filter(value: string) {
    return this.options.filter((option) => option.includes(value));
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  removePassport() {
    this.bookingForm.removeControl('passport');
  }

  addGuest() {
    this.guestList.push(this.addGuestControl());
  }

  addGuestControl() {
    return this.formBuilder.group<{
      name: FormControl<string | null>;
      age: FormControl<string | null>;
    }>({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      age: new FormControl('', {
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      }),
    });
  }

  removeGuest(index: number) {
    this.guestList.removeAt(index);
  }

  getDefaultBookingData() {
    return {
      roomId: this.selectRoom.roomNumber,
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: 'Reserved',
      bookingAmount: this.selectRoom.price,
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestAddress: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guestCount: '',
      guestList: [],
    };
  }

  addBooking(formDirective: FormGroupDirective) {
    // console.log(this.bookingForm.errors);
    // Object.keys(this.bookingForm.controls).forEach((field) => {
    //   let errors = this.bookingForm.controls[field].errors;
    //   if (errors) {
    //     console.log(`Field ${field} error`, errors);
    //   }
    // });
    // console.log(this.bookingForm.getRawValue());
    // this.loading = true;
    // window.setTimeout(() => {
    this.bookingService
      .bookRoom(this.bookingForm.getRawValue())
      .subscribe((data) => {
        this.snackBar.open('Room added successfully!', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.bookingService.bookingAdded.next(data);
        this.bookingForm.markAsPristine();
        formDirective.resetForm();
        this.bookingForm.reset(this.getDefaultBookingData());
        this.loading = true;
      });
    // }, 4000);

    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => console.log(data));
  }
}
