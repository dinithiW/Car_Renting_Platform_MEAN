import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthenticationService } from '../services/authentication.services';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user = '';
  constructor(private router:Router) { }

   ngOnInit() {
    console.log(JSON.parse(localStorage.currentUser)[0].Name);

    this.user = JSON.parse(localStorage.currentUser)[0].Name;
    console.log(this.user);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

}
