import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { __await } from 'tslib';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private Users: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      profPic: [],
      alerts: ['', [Validators.requiredTrue]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  // Method to add new user object using Server REST API
  async addUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.errors);
      console.log(this.registerForm.invalid);
      return;
    }
    console.log(this.registerForm.get('name').value);

    const user = {
      Name: this.registerForm.get('name').value,
      Email: this.registerForm.get('email').value,
      Password: this.registerForm.get('password').value,
      Address: this.registerForm.get('address').value,
      City: this.registerForm.get('city').value,
      Alerts: this.registerForm.get('alerts').value
    };
    /**
     * Add user
     */

    // Check if user with same email already exists
    this.Users.getUser(this.registerForm.get('email').value).then(data => {
      console.log(JSON.stringify(data));
      if (data.length > 0) {
        console.log('User already exists');
        alert('User already exists with this Email address');
      } else {
        console.log('New User');
        this.Users.putUser(user);
        alert('Registration Successful');
        this.router.navigate(['/']);
      }
    });
  }
}

