import { Component, OnInit } from '@angular/core';
import {CarsService} from '../services/cars.services';
import { Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm,FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.services';
import { BookingsComponent } from '../bookings/bookings.component';
import { BookingsService } from '../services/bookings.service';
import { element } from 'protractor';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{MatNativeDateModule } from '@angular/material';
import * as moment from 'moment';

declare var $: any;
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

   filters = [
     ['carName', 'Car Name'], ['seatCount', 'Seat Count'], ['carYear', 'Year of Manufacture'],['city', 'City']
    ];
   filterString;
   filterStringplace;
   selcetedValue : string;
   currentValues = [0, 0];
   currentValues2 = [2000, 3500];
   cars = [];
   closeResult : string;
   isLoggedIn;
   public from;
   arr: any[]=[];  

  constructor(private carsService: CarsService,
     private route: Router, private modalService: NgbModal,
     private authService : AuthenticationService,
     private booking:BookingsService) { }

  ngOnInit() {
    //  $(document).ready(function(){
    //    $('#from').datepicker({
    // //     onSelect: function() { 
    // //       var dateObject = $(this).datepicker('getDate'); 
    // //       console.log(dateObject);
    //   // }
    //    });
    //  });
    this.isLoggedIn = this.authService.checkLoggedInUser();
    console.log(this.isLoggedIn);
    if(!this.isLoggedIn){
      alert("Kindly Login into your account");
      this.route.navigate(['']);
    }
    this.carsService.getCars().then((data) => {
       console.log(JSON.stringify(data));
       this.cars = data as string [];
       console.log(this.cars);
    });

  }
  /**
   *
   * @param selectedValues
   * Method:- TO get selected value in the Filter
   * 
   */
  onSliderChange(selectedValues: number[]) {
    console.log(selectedValues);
    this.currentValues = selectedValues;
}

onSubmit(f:NgForm){
 
 //console.log($('#from').datepicker({dateFormat: 'dd-mm-yyyy'}));
   console.log("end dtm::::"+(f.value.from + '.00'));

   var fromVal = f.value.from;
   var untilVal = f.value.until;

   var mFromVal = moment(fromVal,"MM-DD-YYYY");
   var mUntilVal = moment(untilVal,"MM-DD-YYYY");

   var parseFromVal = mFromVal.toISOString(true).split("+");
   var parseUntilVal = mUntilVal.toISOString(true).split("+");

   console.log("heyyyyoooo");
   console.log(parseFromVal);

   var fromValFinal = parseFromVal[0]+'Z';
   var untilValFinal = parseUntilVal[0]+'Z';

  //  var test = f.value.from;
  // var mtest = moment(test,"MM-DD-YYYY")
  // console.log(mtest.toISOString(true));

   //console.log(typeof(f.value.from));
  
  let bookedcars;
  this.carsService.getCars().then((data) => {
    console.log(JSON.stringify(data));
    this.cars = data as string [];
    console.log(this.cars);
 });

  // this.booking.getcarsbydate((f.value.from + ':00.000Z'),(f.value.until+':00.000Z')).then(
    this.booking.getcarsbydate((fromValFinal),(untilValFinal)).then(
    (data)=>{
     console.log(data)
   bookedcars = data as string [];
   console.log(bookedcars);
       bookedcars.forEach(element => {
             this.cars = this.cars.filter((car)=>{
              console.log('yeeee');
              console.log(car['_id']);
              console.log(element['carId']);
               return car['_id']!== element['carId']
            })
       });
    }
    
  )
   console.log(bookedcars);
   console.log(this.cars);
}
}
