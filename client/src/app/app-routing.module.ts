import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsComponent } from './cars/cars.component';
import { RegisterComponent } from './register/register.component';
import {CarDetailsComponent} from './cars/car-details/car-details.component';
import { from } from 'rxjs';
import { ListCarComponent } from './list-car/list-car.component';
import { CarBookingComponent } from './car-booking/car-booking.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PaymentComponent } from './payment/payment.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { BookingConfirmComponent } from './booking-details/booking-details.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { CarTripsComponent } from './car-trips/car-trips.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginPageComponent},
  {path: 'cars', component: CarsComponent},
  {path: 'cars/:id', component: CarDetailsComponent},
  {path: 'listCar' , component: ListCarComponent},
  {path: 'listCar/:id' , component: ListCarComponent},
  {path: 'home', component: HomeComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path : 'my-cars', component: MyCarsComponent},
  {path: 'payment/:amount/:carId/:start/:end' , component: PaymentComponent},
  {path: 'booking-confirm/:id' , component: BookingConfirmComponent},
  {path: 'bookings', component: BookingsComponent},
  {path: 'car-trips', component: CarTripsComponent},
  {path: 'allCars', component: AllCarsComponent},
  {path: 'allCars/:id' , component: AllCarsComponent},
  {path: '404', component: NotFoundComponentComponent},
  {path: 'bookcar/:id' , component: CarBookingComponent},
  {path: 'forgetpassword' , component: ForgetPasswordComponent},
  {path: 'resetpassword' , component: ResetPasswordComponent},
 {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

