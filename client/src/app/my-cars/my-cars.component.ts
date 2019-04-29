import { Component, OnInit } from '@angular/core';
import {CarsService} from '../services/cars.services';
import { Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.services';


@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.component.html',
  styleUrls: ['./my-cars.component.css']
})
export class MyCarsComponent implements OnInit {

  isLoggedIn;
  selcetedValue;
  cars = [];
  userId;
  constructor(private carsService: CarsService, private route: Router, private authService: AuthenticationService) { }

  ngOnInit() {


    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn){
      alert("Kindly Login into your account");
      this.route.navigate(['']);
    }

    this.userId = JSON.parse(localStorage.currentUser);
    console.log(this.userId[0]._id);
    this.carsService.getCarsforUser(this.userId[0]._id).then((data) => {
      console.log(JSON.stringify(data));
      this.cars = data as string [];
      console.log(this.cars);
   });
  }

}
