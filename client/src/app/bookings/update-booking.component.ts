import { Component, OnInit,Inject } from '@angular/core';
import { DialogData } from '../bookings.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CarsService} from '../../services/cars.services';
import { Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm,FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.services';
import { BookingsComponent } from '../../bookings/bookings.component';
import { BookingsService } from '../../services/bookings.service';
import { element } from 'protractor';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{MatNativeDateModule } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit {

  filters = [
    ['carName', 'Car Name'],  ['carYear', 'Year of Manufacture'],['city', 'City']
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
   bookingId;
   fromDate;
   endDate;
   fromTime;
   endTime;

  constructor(public dialogRef: MatDialogRef<UpdateBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private carsService: CarsService,
    private route: Router, private modalService: NgbModal,
    private authService : AuthenticationService,
    private booking:BookingsService) {
      console.log("This is what I am checking");
      console.log(data.bookingId);
     }

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

  onSubmit(f:NgForm){
 
    this.fromDate = f.value.from;
    this.endDate = f.value.until;
    this.fromTime = f.value.exampleFrom;
    this.endTime = f.value.exampleUntil;

    //console.log($('#from').datepicker({dateFormat: 'dd-mm-yyyy'}));
      console.log("end dtm::::"+(f.value.from + '.00'));
   
      var fromVal = f.value.from;
      var untilVal = f.value.until;
   
      console.log('fromVal is');
      console.log(fromVal);
      
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

  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
  }

  updateBooking(carId,carPrice){
    //id is the id of the car
    console.log('I am in update Booking')
    console.log(this.fromTime);

    var fromVal = this.fromDate;
    var untilVal = this.endDate;
   
      console.log('fromVal is');
      console.log(fromVal);
      
      var mFromVal = moment(fromVal,"MM-DD-YYYY");
      var mUntilVal = moment(untilVal,"MM-DD-YYYY");
   
      var parseFromVal = mFromVal.toISOString(true).split("+");
      var parseUntilVal = mUntilVal.toISOString(true).split("+");

      var fromDateOnly = mFromVal.toISOString(true).split("T");
      var untilDateOnly = mUntilVal.toISOString(true).split("T"); 

      console.log("heyyyyoooo");
      console.log(parseFromVal);
   
      var fromValFinal = (fromDateOnly[0]+'T'+this.fromTime+':00.000Z');
      var untilValFinal = (untilDateOnly[0]+'T'+this.endTime+':00.000Z');

   
    this.bookingId = this.data.bookingId;
    //get time and date of arrival and leaving time
    // let params = {"active" : 0}
    this.booking.editBooking(carId,this.bookingId,fromValFinal,untilValFinal,carPrice);

  }
}
