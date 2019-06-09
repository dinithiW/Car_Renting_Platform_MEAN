import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CarsService } from '../services/cars.services';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material';
import * as moment from 'moment';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  /***
   *
   * Variables
   */
  listBookings= [];  
  cancelledBookings = [];
  confirmedBookings = [];

  completedTrips = [];
  pendingTrips = [];
  booking= {};
  time;
  selected = 0;
  hovered = 0;
  readonly = false;

  now = new Date();

  constructor(private bookings:BookingsService,private carsService:CarsService,private userService:UsersService) { }

  ngOnInit() {

    this.time = new Date();
    /***
     * Method :- TO get all the bookings.
     * Author:- Rajat Acharya
     *
     */

    console.log('today is');
    console.log(this.now);

    var mToday = moment(this.now,"MM-DD-YYYY");
    var parseToday = mToday.toISOString(true).split("+")
    //console.log("heyyyyoooo");
    //console.log(parseToday);
    var todayFinal = parseToday[0]+'Z';

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
            this.confirmedBookings.push(this.booking);

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
            this.cancelledBookings.push(this.booking);
          }
          this.listBookings.push(this.booking);

       });
      }
      console.log(this.listBookings);
   });
  }

  cancelBooking(input){
    console.log(input);
    let params = {"active" : 0}
    this.bookings.updateBooking(params,input);
    window.location.reload();
  }

  /*
  showContent(a){
    console.log(a.index)
    if(a.index==0){
      this.getBookings(true);
      //show the confirmed bookings only

    }else{
      //show the cancelled bookings
      this.getBookings(false);
    }
  }

  getBookings(a){
    this.bookings.getSelectedCars( JSON.parse(localStorage.currentUser)[0]._id,a).then((data) => {
      //console.log(data);

      for( let booking of data as string[]){

        this.carsService.getCar(booking['carId']).then((data2) => {
          this.booking ={};
          
          if(a){
            this.booking['status']= "Confirmed";
          }else{
            this.booking['status']= "Cancelled";
          }
          
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
         // this.tempBookingList.push(this.booking);

       });
      }
      console.log('heyheyhye');
      //console.log(this.tempBookingList);
   });
  }*/
}
