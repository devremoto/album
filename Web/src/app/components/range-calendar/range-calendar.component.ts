import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-range-calendar',
  templateUrl: './range-calendar.component.html',
  styleUrls: ['./range-calendar.component.css']
})
export class RangeCalendarComponent implements OnInit {
  @Input()
  btnClass = 'primary';
  @Input()
  searchButton = true;
  @Output()
  rangeSelected: EventEmitter<any> = new EventEmitter<any>();

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
  }


  onDateSelection(date: NgbDate, datepicker: NgbInputDatepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.toggle(datepicker);
      const from = this.convertToDate(this.fromDate);
      const to = this.convertToDate(this.toDate);
      this.rangeSelected.emit({ from, to });
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  enterPressed() {
    const from = this.convertToDate(this.fromDate);
    const to = this.convertToDate(this.toDate);
    this.rangeSelected.emit({ from, to });
  }

  toggle(c: NgbInputDatepicker) {
    c.toggle();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  convertToDate(date: NgbDate): string {
    if (!date) {
      return null;
    }
    const dateResult = `${date.year}-${date.month}-${date.day}`;
    return dateResult;
  }

}
