import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingsService {

  constructor(private httpClient:HttpClient) { }
  /**
   *
   * @param query
   * Method to get bookings
   */
  getBookings(query) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get('http://localhost:3000/bookings?userId='+ query).subscribe(

        (data) => {
          console.log(data);
          resolve(data);

        },
        (err) => {
          reject(err);
        });
    });
    return promise;


  }

  //Get all bookings within a  date range
  getcarsbydate(query1,query2) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get("http://localhost:3000/bookings?startTime="+query1+"&endTime="+ query2).subscribe(

        (data) => {
          console.log('there are someeeeee');
          console.log(data);
          resolve(data);
        },
        (err) => {
          reject(err);
        });
    });
    return promise;


  }

  //Update booking details on DB based on input paramaters
  updateBooking(input,id){
    let params = {};
    console.log(input);
    if(input.ownerRating){
      params = {"ownerRating" : input.ownerRating}
    }
    if(input.userRating){
      params = {"userRating" : input.userRating}
    }
    if(input.active == 0){
      console.log(input.active);
      params = {"isActive" : false}
    }
    let promise = new Promise((resolve, reject) => {

      this.httpClient.put('http://localhost:3000/bookings/' + id,
      params)
      .subscribe(
          data => {
              resolve(data);
              console.log('PUT Request is successful ', data);
          },
          error => {
              console.log('Error', error);
          }
      );
    });
    return promise;
  }

  //Get all bookings for a particular car
  getBookingByCar(query){
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get('http://localhost:3000/bookings?carId=' + query).subscribe(

        (data) => {
          console.log(data);
          resolve(data);
        },
        (err) => {
          reject(err);
        });
    });
    return promise;
  }


  //Ger particular using bookingID
  getBooking(query) {
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get('http://localhost:3000/bookings/' + query).subscribe(

        (data) => {
          console.log(data);
          resolve(data);
        },
        (err) => {
          reject(err);
        });
    });
    return promise;


  }
}
