import { Component, OnInit,ChangeDetectorRef, ViewChild,ElementRef ,AfterViewInit} from '@angular/core';
import { CarsService } from '../services/cars.services';
import { AuthenticationService } from '../services/authentication.services';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, Validators, FormGroup ,FormBuilder} from '@angular/forms';
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
  paymentForm: FormGroup;
  submitted: boolean;
  registerForm: any;
 constructor(private cd:ChangeDetectorRef ,private carservice: CarsService, private route: Router, private authService: AuthenticationService,private active: ActivatedRoute, private formBuilder: FormBuilder) { }
 
 
  ngOnInit() {

    this.paymentForm = this.formBuilder.group({
      card: ['', Validators.required],
      exp: ['', Validators.required],
      cvc: ['', Validators.required]
      
  });
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

  get f() { return this.paymentForm.controls; }
/**
 *
 * Adding Payment
 */

payment() {
  this.submitted = true;

        // stop here if form is invalid
        if (this.paymentForm.invalid) {
            return;
        }
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
    const amt = data['amount'] / 100;
    console.log("Booking ID :"+ this.bookingId + " " +"Amount: Rs." + amt);
    // Uncomment below
    // this.carservice.sendCode("Booking ID :"+ this.bookingId + " " +"Amount: Rs." + amt);
    // window.location.href = data['receipt_url'];
  });




  }

}
