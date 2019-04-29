import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable()
export class FileService {
  constructor(private httpClient: HttpClient) {
  }
  file: File;
  //Method to upload a new file into user folder and return path of uploaded file
  uploadFile(input, userId) {

    this.file = input;

    let promise = new Promise((resolve, reject) => {
    const params = new HttpParams().set('userId', userId);
    const formdata: FormData = new FormData();
    formdata.append('profPic', this.file);

      //console.log(input.FirstName);
      this.httpClient.post('http://localhost:3000/fileUpload' , formdata ,
         {params} )
        .subscribe(
            data => {
                console.log( data );
                resolve(data);
            },
            error => {
                console.log('Error', error);
            });
      });
      return promise;
  }

}
