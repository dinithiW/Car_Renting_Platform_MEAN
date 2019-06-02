import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { CarsService } from '../services/cars.services';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

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
  booking= {};
  time;
  selected = 0;
  hovered = 0;
  readonly = false;
  constructor(private bookings:BookingsService,private carsService:CarsService,private userService:UsersService) { }

  ngOnInit() {

    this.time = new Date();
    /***
     * Method :- TO get all the bookings.
     * Author:- Rajat Acharya
     *
     */
    this.bookings.getBookings( JSON.parse(localStorage.currentUser)[0]._id).then((data) => {
      console.log(data);

      for( let booking of data as string[]){

        this.carsService.getCar(booking['carId']).then((data2) => {
          this.booking ={};
          if(booking['isActive']){
            this.booking['status']="Confirmed"
          }
          else{
            this.booking['status']="Cancelled"
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
  }

}
