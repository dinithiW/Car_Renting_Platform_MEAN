import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from '../services/authentication.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = '';
  constructor(private router:Router) { }

  ngOnInit() {
    console.log(JSON.parse(localStorage.currentUser)[0].FirstName);

    this.user = JSON.parse(localStorage.currentUser)[0].FirstName;
    console.log(this.user);
  }
  /**
   * Method Name:- Logout
   * Author:- Rajat Acharya
   */
  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
