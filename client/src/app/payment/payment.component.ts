import { Component, OnInit,ChangeDetectorRef, ViewChild,ElementRef ,AfterViewInit} from '@angular/core';
import { CarsService } from '../services/cars.services';
import { AuthenticationService } from '../services/authentication.services';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
 isLoggedIn;
 bookingId;
 total:any;
 carid :any;
 startD :Date;
 endD:Date;
 private userObj = {};
 private username;
//  private carId  = localStorage.carId;
//  private startDate = localStorage.startdate;
//  private endDate = localStorage.enddate;
//  private startTime = localStorage.startTime;
//  private endTime = localStorage.endTime;
 private bookingprice  = localStorage.bookingPrice;
 constructor(private cd:ChangeDetectorRef ,private carservice: CarsService, private route: Router, private authService: AuthenticationService,private active: ActivatedRoute) { }
 
 
  ngOnInit() {


    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);
    if (!this.isLoggedIn) {
      alert('Kindly Login into your account');
      this.route.navigate(['']);
    }


    this.userObj = JSON.parse(localStorage.currentUser);
    
this.username = this.userObj[0]._id;
this.total = this.active.snapshot.params['amount'];
this.carid = this.active.snapshot.params['carId'];
this.startD = this.active.snapshot.params['start'];
this.endD = this.active.snapshot.params['end'];
//console.log(this.carid,this.endD,this.startD);
  }
/**
 *
 * Adding Payment
 */

payment() {
  console.log('doing payment::::::');

  const payment = {
    'userName' : this.username,
'carId' : this.carid,
'startDate' : this.startD,
'endDate' : this.endD,
    'email': 'nisalya@gmail.com',
    'bookingprice' : this.total * 100
     };
 this.carservice.doPayment(payment).then(
  data => {
    this.bookingId = data['booking_id'];
    console.log(this.bookingId);
    this.route.navigate(['booking-confirm/' + this.bookingId]);
  });




  }

}
