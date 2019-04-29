///<reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CarsService } from '../services/cars.services';
import { JsonPipe } from '@angular/common';
import { FileService } from '../services/files.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})
export class ListCarComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  file;
  id;
  filePath;
  oldCar = {};
  geocoder:any;

  latitude;
  longitude;
  address ;
  user = JSON.parse(localStorage.currentUser);

  constructor( private formBuilder: FormBuilder,  private wrapper: GoogleMapsAPIWrapper,private router:Router,private active: ActivatedRoute, private carservice:CarsService,public mapsApiLoader: MapsAPILoader, private Files: FileService) {
    this.mapsApiLoader = mapsApiLoader;

    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
    this.geocoder = new google.maps.Geocoder();

    });


  }

  states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
];
  ngOnInit() {

    this.id = this.active.snapshot.params['id'];
    console.log(this.id);
    this.active.params.subscribe(
      (params) => {
       this.id = params['id'];
      });

    if(this.id){
      console.log("Inside If");
      this.carservice.getCar(this.id).then(
        data =>{
          console.log(data);
          this.oldCar =data
          console.log(this.oldCar);
         //this.populateCarsDetails(this.oldCar);
         });
    }

    this.registerForm = this.formBuilder.group({
      carName: ['', Validators.required],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      carPrice: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      carYear : ['', [Validators.required, Validators.pattern('[0-9]*')]],
      address2: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      alerts: ['', [Validators.required]],
      description:['',[Validators.required]],
      parkingDetails :['',[Validators.required]],
      features:['',[Validators.required]],
      dailyDistance: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      weeklyDistance:['', [Validators.required, Validators.pattern('[0-9]*')]],
      monthlyDistance:['', [Validators.required, Validators.pattern('[0-9]*')]],
      milage:['', [Validators.required, Validators.pattern('[0-9]*')]],
      doors:['', [Validators.required, Validators.pattern('[0-9]*')]],
      seats:['', [Validators.required, Validators.pattern('[0-9]*')]],
      fuelType:['',[Validators.required]],
  });
  }

  //Method to delete a listed a car
  deleteCar(){
    this.carservice.deleteCar(this.id);
    this.router.navigate(['/my-cars'])
  }

  get f() { return this.registerForm.controls; }

  //Method to add a new car using REST API
  addCar(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log(this.registerForm.errors);
      console.log(this.registerForm.invalid);
      return;
    }
    this.address= this.registerForm.get('address2').value + ','+ this.registerForm.get('city').value +','+ this.registerForm.get('state').value + ',' + this.registerForm.get('zip').value
    console.log(this.address);

    this.getLocation(this.address)
    if(this.file){
      console.log(this.user[0]._id);
      this.Files.uploadFile(this.file, this.user[0]._id).then(
        data =>{
        this.filePath = data;
        //alert(this.filePath);
        console.log(this.filePath);
        this.createCarObj();
        });
    }
    else{

     // this.filePath = this.oldCar.carImagePath;

      this.createCarObj();
    }
  }


  //Method to create car object from form fields
  createCarObj(){
      let car = {
        'carName':  this.registerForm.get('carName').value,
        'carYear':  this.registerForm.get('carYear').value,
        'userId' :  this.user[0]._id,
        'carImagePath':  this.filePath,
        'carPrice': this.registerForm.get('carPrice').value,
        'description':  this.registerForm.get('description').value,
        'features':  this.registerForm.get('features').value,
        'parkingDetails':  this.registerForm.get('parkingDetails').value,
        'guidelines':  'NO guidelines',
        'dailyDistance':  this.registerForm.get('dailyDistance').value,
        'weeklyDistance':  this.registerForm.get('weeklyDistance').value,
        'monthlyDistance':  this.registerForm.get('monthlyDistance').value,
        'milage':   this.registerForm.get('milage').value ,
        'fuelType':  this.registerForm.get('fuelType').value ,
        'doorCount':this.registerForm.get('doors').value ,
        'seatCount': this.registerForm.get('seats').value,
        'address': this.registerForm.get('address2').value,
        'city': this.registerForm.get('city').value,
        'state': this.registerForm.get('state').value,
        'zip':this.registerForm.get('zip').value,
        'latitude': this.latitude,
        'longitude':this.longitude
       }
      if(this.id){
        console.log("Inside update car");
        this.carservice.updateCar(car, this.id);
      }
      else{
        console.log("Inside Else");
      this.carservice.putCar(car);
      }

  }



  //Method to get location co-ordinates from Google APIs.
  getLocation(address) {
  console.log("in get location::::::::"+ address);
  this.geocoder = new google.maps.Geocoder()
//  if (!this.geocoder) this.geocoder = new google.maps.Geocoder()
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      console.log(results);
      if (status == google.maps.GeocoderStatus.OK) {
                // decompose the result
                console.log(results[0].geometry.bounds.j.l);
                console.log(results[0].geometry.bounds.l.l);

                this.latitude =results[0].geometry.bounds.j.l
                this.longitude =results[0].geometry.bounds.l.l

      } else {
        alert("Sorry, this search produced no results.");
      }
    })
  }
  onFileUpload(event){
      this.file = event.target.files[0];
     console.log(this.file);

  }



}
