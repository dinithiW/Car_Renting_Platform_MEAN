import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CarsService } from '../services/cars.services';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from '../services/authentication.services';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-car-trips',
  templateUrl: './car-trips.component.html',
  styleUrls: ['./car-trips.component.css']
})
export class CarTripsComponent implements OnInit {

  listBookings= [];
  completedTrips = [];
  pendingTrips = [];
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

    console.log('today is');
    console.log(this.now);
   var mToday = moment(this.now,"MM-DD-YYYY");
   var parseToday = mToday.toISOString(true).split("+")
   console.log("heyyyyoooo");
   console.log(parseToday);
   var todayFinal = parseToday[0]+'Z';

  //  var untilValFinal = parseUntilVal[0]+'Z';
    //Get all bookings for cars listed by the currently logged in User
    this.userId = JSON.parse(localStorage.currentUser)[0]._id;

    this.bookings.getBookings( JSON.parse(localStorage.currentUser)[0]._id).then((data) => {
      console.log(data);

      for( let booking of data as string[]){

        this.carsService.getCar(booking['carId']).then((data2) => {
          this.booking ={};
          
          this.booking['id']= booking['_id'];
          this.booking['bookingDate'] =booking['created_date']
          this.booking['booking_startTime']=booking['booking_startTime'];
          this.booking['booking_endTime']=booking['booking_endTime'];
          this.booking['ISODate'] = new Date(booking['booking_endTime']);
          console.log( new Date(booking['booking_endTime']))
          let car = data2 as string []
          console.log(car);
          this.booking['carName'] = car['carName'];
          this.booking['carImagePath'] =car['carImagePath'];
          this.booking['receipt_url'] = booking['receipt_url'];

          var bookingEnd = new Date(this.booking['booking_endTime']).getTime();
          var bookingToday = new Date(todayFinal).getTime();


          if(booking['isActive']){
            this.booking['status']="Confirmed";
            console.log('differences of all follows here')
                  console.log(bookingToday-bookingEnd);
                  if(bookingToday-bookingEnd>0){
                    //get completed trips
                    console.log('completed trips where are you??');
                    this.completedTrips.push(this.booking);
                  }else{
                    //pending trips
                    console.log('ahaaaaaaaaaaaaa there has to be one')
                    this.pendingTrips.push(this.booking);
                  }
          }
          else{
            this.booking['status']="Cancelled";
            
          }
          this.listBookings.push(this.booking);

       });
      }
      console.log(this.listBookings);
   });

    /*this.carsService.getCarsforUser(this.userId).then(
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
                console.log('ohogohoboho')
                var bookingEnd = new Date(this.booking['booking_endTime']).getTime();
                var bookingToday = new Date(todayFinal).getTime();

                if(booking['isActive']){
                  console.log('differences of all follows here')
                  console.log(bookingToday-bookingEnd);
                  if(bookingToday-bookingEnd>0){
                    //get completed trips
                    console.log('completed trips where are you??');
                    this.completedTrips.push(this.booking);
                  }else{
                    //pending trips
                    console.log('ahaaaaaaaaaaaaa there has to be one')
                    this.pendingTrips.push(this.booking);
                  }
                }
                
                console.log(bookingToday-bookingEnd);
                this.listBookings.push(this.booking);
                this.booking ={};

            }
            console.log(this.listBookings);
          });
      });*/
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
