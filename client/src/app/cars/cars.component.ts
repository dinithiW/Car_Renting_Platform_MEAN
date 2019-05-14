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
declare var $: any;
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

   filters = ['carName', 'seatCount', 'carYear','city'];
   filterString;
   filterStringplace;
   selcetedValue : string;
   currentValues = [0, 0];
   currentValues2 = [2000, 3500];
   cars = [];
   closeResult : string;
   isLoggedIn;
  constructor(private carsService: CarsService,
     private route: Router, private modalService: NgbModal,
     private authService : AuthenticationService,
     private booking:BookingsService) { }

  ngOnInit() {
          
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
   * Author:-Rajat Acharya
   */
  onSliderChange(selectedValues: number[]) {
    console.log(selectedValues);
    this.currentValues = selectedValues;
}

onSubmit(f:NgForm){
  console.log("end dtm::::"+(f.value.from + '.00'));
  let bookedcars;
  this.carsService.getCars().then((data) => {
    console.log(JSON.stringify(data));
    this.cars = data as string [];
    console.log(this.cars);
 });

 this.booking.getcarsbydate((f.value.from + ':00.000Z'),(f.value.until+':00.000Z')).then(
   (data)=>{
    console.log(data)
  bookedcars = data as string [];
  console.log(bookedcars);
      bookedcars.forEach(element => {
            this.cars = this.cars.filter((car)=>{

              return car['_id']!== element['carId']
            })
      });
   }
 )
  console.log(bookedcars);
  console.log(this.cars);
}
}
