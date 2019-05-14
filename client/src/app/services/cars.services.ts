import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class CarsService {
  constructor(private httpClient : HttpClient){

  }
  private cars = [];

  getCars(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get<Array<any>>('http://localhost:3000/allCars')//cars
      .subscribe(data => {
        console.log(data as string []);
        resolve(data as string[]);
      },
      error => {
        reject(error);
      });
    });
    return promise;

  }
  //Method to get a particular based on CarId
  getCar(query) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get('http://localhost:3000/cars/'+ query).subscribe(
        data => {
          resolve(data);
          console.log("daaaa:::::"+ data);
        });
    });
    return promise;
 }

  getAllCars(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get<Array<any>>('http://localhost:3000/allCars')//cars
      .subscribe(data => {
        console.log(data as string []);
        resolve(data as string[]);
      },
      error => {
        reject(error);
      });
    });
    return promise;
}


 //Method to get all cars for a particular user
  getCarsforUser(userId) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get('http://localhost:3000/cars?userId=' + userId).subscribe(
        data => {
          resolve(data);
          console.log(data);
        });
    });
    return promise;
  }

  //Method to update the car details of an existing car
  updateCar(input, id){
    console.log(input);
    this.httpClient.put('http://localhost:3000/cars/' + id,
      {
        carName: input.carName,
        carYear: input.carYear,
        carImagePath: input.carImagePath,
        userId:  input.userId,
        carPrice: input.carPrice,
        description: input.description,
        features: input.features,
        parkingDetails: input.parkingDetails,
        guidelines: input.guidelines,
        dailyDistance: input.dailyDistance,
        weeklyDistance: input.weeklyDistance,
        monthlyDistance: input.monthlyDistance,
        milage:  input.milage,
        fuelType:  input.fuelType,
        doorCount: input.doorCount,
        seatCount: input.seatCount,
      })
      .subscribe(
          data => {
              console.log('PUT Request is successful ', data);
    
          },
          error => {
              console.log('Error', error);
          }
      );
  }

  //Method to delete an existing car using car ID
  deleteCar(input){
    let carId = input;
    this.httpClient.delete('http://localhost:3000/allCars/' + carId).
    subscribe(
      data => {
        console.log('Delete Request is successful ', data);
    },
    error => {
        console.log('Error', error);
    });
  }

  //Method to insert a new Car object in the DB
  putCar(input) {
    console.log( input.carName);
    this.httpClient.post('http://localhost:3000/cars',
      {
        carName: input.carName,
        carYear: input.carYear,
        carImagePath: input.carImagePath,
        userId:  input.userId,
        carPrice: input.carPrice,
        description: input.description,
        features: input.features,
        dailyDistance: input.dailyDistance,
        fuelType:  input.fuelType,
        doorCount: input.doorCount,
        seatCount: input.seatCount,
        address: input.address,
        city:input.city,
        zip: input.zip
      })
      .subscribe(
          data => {
              console.log('POST Request is successful ', data);
          },
          error => {
              console.log('Error', error);
          }
      );
}



doPayment(payment){
  console.log(payment);
    let promise = new Promise((resolve, reject) => {
    this.httpClient.post('http://localhost:3000/bookings',
      {
         'userId': payment.userName,
         'carId': payment.carId,
         'booking_startTime': payment.startDate,
         'booking_endTime': payment.endDate,
         'booking_price': payment.bookingprice,
      })
      .subscribe(
          data => {
            resolve(data);
            console.log(data);
          },
          error => {
              console.log('Error', error);
          });
    });
    return promise;
}

}
