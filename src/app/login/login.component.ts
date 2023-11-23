import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'hinv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  hiloginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hiloginForm = this.formBuilder.group(
      {
        email: new FormControl('', {
          validators: [Validators.required],
        }),
        password: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      { updateOn: 'blur', validators: Validators.required }
    );
  }

  login() {
    if (this.loginService.login(this.hiloginForm.value.email, this.hiloginForm.value.password)) {
      // alert('Login successful!');
      // this.router.navigate(['/room', 'add']);
      this.router.navigateByUrl('/booking');
    }
  }
}
