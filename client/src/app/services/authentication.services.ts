import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthenticationService {
  constructor(private httpClient: HttpClient,
    private user:UsersService) {

  }
  /**
   * Method Name:-Login
   * Created by :Rajat Acharya
   *
   */
  login(user): Promise<any> {
    let promise  = new Promise((resolve, reject) => {

        this.user.getUser(user).then(
          (data) => {
              resolve(data);
              console.log(JSON.stringify(data));
              localStorage.setItem( 'currentUser', JSON.stringify(data));
          },
          error => {
            reject(error);
          }
        );
    } );
    return  promise ;
  }
/**
 * Method Name:-
 *
 */
  logout() {
    localStorage.removeItem('currentUser');
  }

  checkLoggedInUser(){
    let isLoggedIn = false;
    let user = localStorage.currentUser;
    console.log(user);
    if(user){
      isLoggedIn = true;
    }
    return isLoggedIn;
  }
}
