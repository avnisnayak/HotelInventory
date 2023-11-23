import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
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

  login() {
    if (this.loginService.login(this.email, this.password)) {
      // alert('Login successful!');
      // this.router.navigate(['/room', 'add']);
      this.router.navigateByUrl('/room/add');
    }
  }
}
