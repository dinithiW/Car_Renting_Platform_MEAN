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

      this.httpClient.put('http://localhost:3000/bookings/' + id,params)
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

  //change date,
   // params = 'carId='+carId+'&booking_price='+carPrice;
    // let paramsasd : {booking_endTime:tillDate}
  editBooking(carId,bookingId,fromDate,tillDate,carPrice){
    console.log('so here will be the code');
    console.log(typeof(carPrice));
    let params = {};
    var finalFromDate= new Date(fromDate);
    var finalTillDate= new Date(tillDate);
    //params = {"isActive" : false}
    console.log(typeof(finalFromDate));
    console.log(finalFromDate)
    params = {carId:carId,booking_price:carPrice,booking_startTime:finalFromDate,booking_endTime:finalTillDate,updateThis:1}
   // params = {booking_startTime:finalFromDate.toISOString}
   //params = {booking_price:12451}

    let postData = new FormData();
   // this.editPrice(bookingId,carPrice);
    //this.editFromDate();
   // this.editTillDate();
    let promise = new Promise((resolve, reject) => {

      this.httpClient.put('http://localhost:3000/bookings/' + bookingId,params)
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

  editPrice(bookingId,price){
    let params = {}
    params = {booking_price:price}

    let promise = new Promise((resolve, reject) => {

      this.httpClient.put('http://localhost:3000/bookings/' + bookingId,params)
      .subscribe(
          data => {
              resolve(data);
              console.log('PUT Request is successful price', data);
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

  //cancelled or confirmed
  getSelectedCars(query1,query2){
    let promise = new Promise((resolve, reject) => {

      this.httpClient.get("http://localhost:3000/bookings?userId="+ query1+"&isActive="+ query2).subscribe(

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
}
