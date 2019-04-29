import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.services';
import { AuthenticationService } from '../services/authentication.services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
 isLoggedIn;
 bookingId;
 private userObj = {}
 private username
 private carId  =localStorage.carId
 private startDate =localStorage.startdate
 private endDate =localStorage.enddate
 private startTime =localStorage.startTime
 private endTime = localStorage.endTime
private bookingprice  =localStorage.bookingPrice

 constructor(private carservice:CarsService, private route: Router, private authService: AuthenticationService) { }

  ngOnInit() {

    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn){
      alert("Kindly Login into your account");
      this.route.navigate(['']);
    }


    this.userObj = JSON.parse(localStorage.currentUser)
    console.log(this.userObj[0]._id);
this.username = this.userObj[0]._id;
  }
/**
 *
 * Adding Payment
 */

payment(){
  console.log("doing payment::::::");

 let payment ={
'userName' : this.username,
'carId' : this.carId,
'startDate' : this.startDate,
'endDate' : this.endDate,
'bookingprice' : this.bookingprice

 };

 this.carservice.doPayment(payment).then(
  data =>{
    this.bookingId = data['_id'];
    console.log(this.bookingId);
    this.route.navigate(['booking-confirm/' + this.bookingId]);
  });




  }

}
