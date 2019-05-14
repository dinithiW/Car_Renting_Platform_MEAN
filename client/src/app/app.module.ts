import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarsComponent } from './cars/cars.component';
import { CarsService } from './services/cars.services';
import { RegisterComponent } from './register/register.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ListCarComponent } from './list-car/list-car.component';
import { AgmCoreModule } from '@agm/core';
import { NpnSliderModule } from "npn-slider";
import { AuthenticationService } from './services/authentication.services';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FileService } from './services/files.service';
import { FilterPipe } from './filter.pipe';
import { MoneyPipe } from './money.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
//  import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsAPIWrapper } from '@agm/core';
//import {} from '@types/googlemaps';
import {MatSelectModule} from '@angular/material';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsService } from './services/bookings.service';
import { PlacePipe } from './place.pipe';
import { MyCarsComponent } from './my-cars/my-cars.component';
import { BookingConfirmComponent } from './booking-details/booking-details.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { CarTripsComponent } from './car-trips/car-trips.component';
import { AllCarsComponent } from './all-cars/all-cars.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule,MatFormFieldModule,MatNativeDateModule,MatInputModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarsComponent,
    RegisterComponent,
    CarDetailsComponent,
    ListCarComponent,
    LoginPageComponent,
    AccountSettingsComponent,
    FilterPipe,
    MoneyPipe,
    PaymentComponent,
    BookingsComponent,
    PlacePipe,
    MyCarsComponent,
    BookingConfirmComponent,
    NotFoundComponentComponent,
    CarTripsComponent,
    AllCarsComponent,
  ],
  imports: [
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBxImSYeJl1s7poHFAufKoeuJ6jrdQbPZo',
      libraries :["places"]
    }),
    NpnSliderModule,
    NgbModule
  ],
  providers: [CarsService, UsersService, MatDatepickerModule,AuthenticationService, FileService,BookingsService,GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
