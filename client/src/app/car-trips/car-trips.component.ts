import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CarsService } from '../services/cars.services';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from '../services/authentication.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-trips',
  templateUrl: './car-trips.component.html',
  styleUrls: ['./car-trips.component.css']
})
export class CarTripsComponent implements OnInit {

  listBookings= [];
  booking= {};
  carId;
  userId;
  selected = 0;
  hovered = 0;
  readonly = false;
  isLoggedIn;

  now = new Date();

  constructor(private bookings:BookingsService,private carsService:CarsService,private userService:UsersService, private authService : AuthenticationService, private route: Router) { }

  ngOnInit() {

    //Check if user has logged in
    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn){
      alert("Kindly Login into your account");
      this.route.navigate(['']);
    }

    //Get all bookings for cars listed by the currently logged in User
    this.userId = JSON.parse(localStorage.currentUser)[0]._id;
    this.carsService.getCarsforUser(this.userId).then(
      data => {

        this.carId = data[0]._id;
        this.bookings.getBookingByCar(this.carId).then(
          data2 => {
            for( let booking of data2 as string[]){
              console.log(booking['_id']);

                let end = new Date(booking['booking_startTime']);
                console.log(booking['userRating']);

                if(booking['isActive']){
                  this.booking['status'] = "Confirmed"
                }
                else{
                  this.booking['status'] = "Cancelled"
                }
                this.booking['id']= booking['_id'];
                this.booking['bookingDate'] =booking['created_date']
                this.booking['booking_startTime']=booking['booking_startTime'];
                this.booking['booking_endTime']=booking['booking_endTime'];
                this.booking['end']=end;
                this.booking['isRated'] = booking['isRated'];
                this.booking['userRating'] = booking['userRating'];
                this.booking['carName'] = data[0].carName;
                this.booking['carImagePath'] =data[0].carImagePath;
                console.log(this.booking);
                this.listBookings.push(this.booking);
                this.booking ={};

            }
            console.log(this.listBookings);
          });
      });
  }


  onClick($event){
    alert($event);
  }

  //Approve Disapprove booking by Owner
  cancelBooking(input){
    console.log(input);
    let params = {"active" : 0}
    this.bookings.updateBooking(params,input);
  }
}
