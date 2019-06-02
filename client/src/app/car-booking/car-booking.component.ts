import { Component, OnInit,ViewChild } from '@angular/core';
import { CarsService } from '../services/cars.services';
import {DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.services';
import { BookingsService } from '../services/bookings.service';
import { DateRangePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { endianness } from 'os';
declare var $: any;
@Component({
  selector: 'app-car-booking',
  templateUrl: './car-booking.component.html',
  styleUrls: ['./car-booking.component.css']
})
export class CarBookingComponent implements OnInit {
  @ViewChild('rangeObj') rangeObj: DateRangePickerComponent;
   id: any;
  price: any;
  carName: any;
  carYear: any;
  description: any;
  milage: any;
  fuelType: any;
  features: any;
  doorCount: any;
  seatCount: any;
  total: any;
  carTempImg: string;
   startDate: Date;
   endDate: Date;
  imgPath: string;
   carObj = {};
 newObj = {};
 public start: any = new Date();
 public startString: String ;

 public end: any = new Date();
 public endString: String ;
  constructor(private carsService: CarsService,
    private route: Router, private modalService: NgbModal,
    private authService: AuthenticationService,
    private booking: BookingsService, private active: ActivatedRoute,private datePipe: DatePipe) {
      
     }



  ngOnInit() {
    $(document).ready(function() {
      $('.datepicker').datepicker();
    });
    this.newObj = JSON.parse(localStorage.currentUser)[0];
    //console.log( this.newObj);
    this.id = this.active.snapshot.params['id'];
    //console.log(this.id);
    this.total = 0;

    this.carsService.getCar(this.id).then(

      data => {
        console.log('oho here comes dataaaaaaa');
        console.log(data);
        this.carObj = data;

        this.populateCarsDetails(this.carObj);
        console.log('ane mona wadayakda');
        console.log(this.carObj['userId']);
       }
    );

  }
  
  onChange(args) {
    this.start = args.value[0];
    this.end = args.value[1];
    let rangeObje = this.rangeObj.getSelectedRange();
    this.total = rangeObje['daySpan'] * this.price;
    this.start = this.datePipe.transform(this.start,"MMM dd, y");
    this.end = this.datePipe.transform(this.end,"MMM dd, y");
    this.startString = this.start.toString();
    this.endString = this.end.toString();
    console.log(this.endString);
  }
  
  populateCarsDetails(carObj) {
    this.price = carObj.carPrice;
    this.carName = carObj.carName;
    this.carYear = carObj.carYear;
    this.imgPath = carObj.carImagePath;
    this.description = carObj.description;
    this.seatCount = carObj.seatCount;
    this.doorCount = carObj.doorCount;
    // method to check the
    if (!this.imgPath) {
      console.log('no car image');

    this.imgPath = this.carTempImg;
    console.log(this.imgPath);

    } else {
      console.log('have car image');
    }
    }
}
