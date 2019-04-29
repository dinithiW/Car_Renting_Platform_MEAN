import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { CarsService } from '../services/cars.services';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from '../services/authentication.services';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [NgbAlertConfig]
})
export class LoginPageComponent implements OnInit {
  message = new Subject<string>();
  status:string;
  constructor(private carService: CarsService, private route: Router,
    private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.logout();
    this.message.subscribe((m) => this.status = m);
    this.message.pipe(
      debounceTime(5000)
    ).subscribe(() => this.status = null);
  }
  /**
   *
   * @param form
   *
   * Method Name:- Authenticate the user
   */
  onSignIn(form: NgForm) {
    const username = form.value.email;
    this.auth.login(username).then(
      data => {
        if (data.length > 0 && data[0].Password === form.value.password) {
          this.route.navigate(['home']);

        }
        else {
          this.message.next(`Invalid User Credentails Please Check your password or Click On Register if New User`);
          this.route.navigate(['']);
        }
      }
    );


  }
}
