import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingsService } from '../services/bookings.service';
import { UsersService } from '../services/users.service';
import { CarsService } from '../services/cars.services';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingConfirmComponent implements OnInit {

  bookingObj;
  bookingId;
  userObj;
  carObj;
  ownerObj;
  public receipt:any ;
  selected1=0;
  selected2=0;

  loggedInUser;

  constructor(private active : ActivatedRoute, private route: Router, private booking: BookingsService, private user: UsersService, private car: CarsService) { }

  ngOnInit() {

    //Get current booking id from url
    this.bookingId = this.active.snapshot.params['id'];
    console.log("ID::::;"+this.bookingId);
    this.active.params.subscribe(
      (params) => {
       this.bookingId = params['id'];
      }
    )

    if(!this.bookingId){
      alert("Please select a booking");
      this.route.navigate(['home']);

    }

    //Get current booking object user Server REST API
    this.booking.getBooking(this.bookingId).then(
      data =>{
        this.bookingObj = data;
        console.log(this.bookingObj);
        this.car.getCar(this.bookingObj.carId).then(
          carData => {
            this.carObj = carData;
            this.user.getUserById(this.carObj.userId).then(
              ownerData => {
                this.ownerObj = ownerData;
              });
          });
          this.user.getUserById(this.bookingObj.userId).then(
            userData => {
              this.userObj = userData;
            });
      });

      // console.log(this.userObj);
      this.loggedInUser = JSON.parse(localStorage.currentUser)[0]._id;


  }

  //Method to set ratings for user and owner
  onClickUser(){
    console.log(this.selected1);
    let inputs = {"userRating" : this.selected1}
    this.booking.updateBooking(inputs,this.bookingObj._id);
    this.user.updateRating(this.selected1,this.userObj._id);
  }
  onClickOwner($event){

    let inputs = {"ownerRating" : this.selected2}
    this.booking.updateBooking(inputs,this.bookingObj._id);
    this.user.updateRating(this.selected2,this.userObj._id);
  }
}
