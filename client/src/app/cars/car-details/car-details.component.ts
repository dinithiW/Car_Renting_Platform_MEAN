/// <reference types="@types/googlemaps" />
import { CarsService } from '../../services/cars.services';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import * as moment from 'moment';


import{Observable} from 'rxjs';
 import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
 import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
 import { Component, Input, ViewChild, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.services';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { isEmpty } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  providers: [NgbRatingConfig]
})
export class CarDetailsComponent implements OnInit {


  checkoutForm: FormGroup;
  isLoggedIn;
private carObj = {};
private newObj = {};
private ownerObj = {};
longitude   = -71.08546280000002;
 latitude   = 42.3456431;
 registerForm: FormGroup;
private startDate: Date;



orderBy: string;
  private totalprice;
 private ownerImg;
   geocoder: any;


 // infowindow = new google.maps.InfoWindow();

private days: any;
private endDate: Date;
private startTime;
private endTime;
private id;
condition = false;
private startDate1: Date;
private price = 100;
private carName = 'Mazda';
private doorCount = 'Mazda';
private seatCount = 'Mazda';
private fuelType = 'Mazda';
private milage = 'Mazda';
private description = 'Mazda';
private features = 'Mazda';
private parkingDetails = 'Mazda';
private guideLines = 'Mazda';
private dailyDistance = 100;
private weeklyDistance = 100;
private monthlyDistance = 100;
private ownerName = "Mr. Iyer" ;
private carYear: string ;
private imgPath: string;
private carImages = [];
private rating;
private ratingArr = [];
private ratingSum = 0;
private carTempImg = 'assets/images/Sinnbild_car.png ';
private test_pic = 'assets/images/test-profilepic.png';
constructor(
  private carservice:  CarsService,
  config: NgbRatingConfig,
  private active: ActivatedRoute,
  private formBuilder: FormBuilder,
  private route: Router ,
  public mapsApiLoader: MapsAPILoader,
  private zone: NgZone,
  private wrapper: GoogleMapsAPIWrapper,
  private authService: AuthenticationService,
  private users: UsersService
  ) {
    config.max = 5;
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
    this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    $(document).ready(function() {
      $('.datepicker').datepicker();
    });
    this.rating = 0;
    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);

    if (!this.isLoggedIn) {
      alert('Kindly Login into your account');
      this.route.navigate(['']);
    }

    this.newObj = JSON.parse(localStorage.currentUser)[0];
console.log( this.newObj);
 this.id = this.active.snapshot.params['id'];
    this.orderBy = '';



// to get the paramate
this.active.params.subscribe(
  (params) => {
   this.id = params['id'];
   console.log('heyyyyyyyyyy this is ID');
   console.log(this.id);
  }
);
 this.carservice.getCar(this.id).then(

   data => {
     console.log('oho here comes dataaaaaaa');
     console.log(data);
     this.carObj = data;

     this.populateCarsDetails(this.carObj);
     console.log('ane mona wadayakda');
     console.log(this.carObj['userId']);

     ///////////////////////// I commented
    //  this.users.getUserById(this.carObj['userId']).then(
    //   data2 => {

    //     this.ownerObj = data2;
    //     this.ownerName =this.ownerObj['FirstName']

    //     if(data2.Ratings)
    //     this.ratingArr = data2.Ratings;
    //     this.calculateCarDetails(this.ratingArr);
    //   }
    // )
    }
 );

}

/** Method to map the data  */
populateCarsDetails(carObj) {
console.log('abc' + carObj);

this.price = carObj.carPrice;
this.carName = carObj.carName;
this.carYear = carObj.carYear;
this.imgPath = carObj.carImagePath;
this.description = carObj.description;
this.milage = carObj.milage;
this.fuelType = carObj.fuelType;
this.features = carObj.features;
// this.parkingDetails = carObj.parkingDetails
// this.guideLines = carObj.guideLines
// this.dailyDistance = carObj.dailyDistance
// this.weeklyDistance = carObj.weeklyDistance
// this.monthlyDistance = carObj.monthlyDistance
// this.ownerName = carObj.ownerName
 this.doorCount  = carObj.doorCount;
 this.seatCount = carObj.seatCount;
// this.carImages =carObj.carImagePath
// this.latitude =carObj.longitude
// this.longitude =carObj.latitude
// this.ownerImg = carObj.ownerImg
// this.ownerName= this.ownerObj['FirstName']



// method to check the
if (!this.imgPath) {
  console.log('no car image');

this.imgPath = this.carTempImg;
console.log(this.imgPath);

} else {
  console.log('have car image');
}

/////////////////////////// I commented the stuff belowwwwwwwwwww
// if(!this.ownerImg){
// console.log('no image profile');

//   this.ownerImg = this.test_pic
//   console.log( this.ownerImg);

// }else{
//   console.log('yes image profile');
// }

}
// method to checkout the form
onCheckout(f) {

console.log('Date' + f.value.startDate);
  }
proceed(f: NgForm) {


  this.condition = (f.value.stDate > f.value.endDate);

if (!(f.value.stDate > f.value.endDate)) {

  this.startDate = new Date ( f.value.stDate);
  console.log(this.startDate);
this.endTime = f.value.endTime;
this.endDate = new Date (f.value.endDate);
this.startTime = f.value.stTime;
this.endTime = f.value.endTime;

console.log('end dtm::::' + (f.value.endDate + ' ' + f.value.endTime + '.00'));
console.log(this.startTime);
console.log(this.endTime);


let now = moment(this.startDate); // todays date
let end = moment(this.endDate); // another date
let duration = moment.duration(end.diff(now));
let days = duration.asDays();
console.log(days);
console.log(this.price);

 this.totalprice = this.price * days;

localStorage.setItem( 'carId', this.id);
localStorage.setItem('startdate', (f.value.stDate + ' ' + f.value.stTime + '.00') );
localStorage.setItem('enddate', (f.value.endDate + ' ' +  f.value.endTime + '.00') );
localStorage.setItem('bookingPrice', this.totalprice);


this.route.navigate(['payment']);
this.datevalidate1(f.value.stDate, f.value.endDate);
}
}

datevalidate1(stdt: string , eddt: string) {


  if (stdt > eddt) {
    console.log('validating dt::');
    return true;
    }
}

// method to calculate average rating
calculateCarDetails(ratings) {
  for (let i = 0; i < ratings.length; i++) {
    this.ratingSum = this.ratingSum + ratings[i].rating;
  }
  console.log(this.ratingSum);

  this.rating = this.ratingSum / ratings.length;
}

}
