import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTripsComponent } from './car-trips.component';

describe('CarTripsComponent', () => {
  let component: CarTripsComponent;
  let fixture: ComponentFixture<CarTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
