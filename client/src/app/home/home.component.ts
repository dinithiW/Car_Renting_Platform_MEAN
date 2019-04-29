import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn;
  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit() {
    /**
     *Authentication Check
     */
    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn){
      alert("Kindly Login into your account");
      this.route.navigate(['']);
    }

  }

}
