import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeCalendarComponent } from './range-calendar.component';

describe('RangeCalendarComponent', () => {
  let component: RangeCalendarComponent;
  let fixture: ComponentFixture<RangeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
