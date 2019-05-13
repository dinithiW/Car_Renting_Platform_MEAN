import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
  cars =[];
  id;
  oldCar = {};
  constructor(private carservice:CarsService,private router:Router,private active: ActivatedRoute) { }
  
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
    this.carservice.getAllCars().then(
    data =>{
      console.log(data);
      var result = Object.keys(data).map(function(key) {
      return [data[key]];
    });
    this.cars =result;
    console.log(result);
    //console.log(this.cars[0].carName);
    //console.log(this.cars[1][0].carName);
    //console.log((this.cars));
    //this.populateCarsDetails(this.oldCar);
    });
    
    
    
  
  }
  onDelete(id){
    
    this.id=id;
    console.log(this.id);
    //this.router.navigate(['/allCars',id])
    //this.router.navigate([id],{relativeTo:this.route});
    //this.router.navigate(['../',{id:selected id}],{relativeTo:this.route})
    if(confirm("Are you sure to delete this recosrd ?")){
      this.carservice.deleteCar(this.id);
      alert('Deleted successfully !');
      this.router.navigate(['/allCars']);
      window.location.reload();
    }
    else{
      this.router.navigate(['/allCars'])
    }
    
  }
  onEdit(car,id){
    this.id=id;
    this.oldCar=car;
    this.router.navigate(['/listCar',id]);
    //this.carservice.updateCar(car,id);
    console.log('haiii');
  }
}
