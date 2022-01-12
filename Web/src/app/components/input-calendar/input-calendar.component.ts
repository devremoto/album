import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbDate, NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { AppDate } from 'src/app/models/common/app-date.model';
import { ToasterService } from '../toaster.service';
import $ from "jquery";
import 'jquery-mask-plugin';
import * as moment from 'moment';

@Component({
  selector: 'app-input-calendar',
  templateUrl: './input-calendar.component.html',
  styleUrls: ['./input-calendar.component.css']
})
export class InputCalendarComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('c', { static: false })
  textInput: NgbInputDatepicker;

  @Input()
  disabled: boolean;

  @Input()
  allowFuture: true;

  @Input()
  allowPast: true;

  @Input()
  btnClass = 'btn-primary';

  @Input()
  model: any;

  @Input()
  maxDate: Date;

  @Input()
  name: string;

  @Input()
  placeholder: string = 'dd/mm/aaaa';

  @Input()
  id: string;

  @Input()
  mask: string = "dd/MM/yyyy";

  @Output()
  calendarToggled: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  inputChanged: EventEmitter<Date> = new EventEmitter<Date>();


  currentModel: Date;
  componentModel: AppDate;
  maxDateModel: AppDate;
  minDateModel: AppDate;
  internalMask: string;

  constructor(
    private toasterService: ToasterService,
  ) {
    this.allowFuture = true;
    this.allowPast = true;
  }

  ngOnInit(): void {
    this.fromDate(this.model);
    if (this.id) {
      this.id = this.generateId();
    }
    this.internalMask = this.mask.replace(/[a-zA-Z]/gi, '9')
  }
  generateId() {
    return `id_${Math.floor((Math.random() * 10) + 1)}`;
  }

  ngAfterViewInit() {
    $(`#${this.id}`).mask(this.internalMask);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && changes.model.currentValue !== changes.model.previousValue) {
      if (this.textInput) {
        this.textInput.writeValue(this.componentModel);
      }
    }

    if (changes.maxDate && changes.maxDate.currentValue !== changes.maxDate.previousValue) {
      this.maxDateModel = this.getAppData(changes.maxDate.currentValue);
    }

    if (changes.allowPast && changes.allowPast.currentValue !== changes.allowPast.previousValue) {
      this.minDateModel = this.getAppData(new Date());
    }
  }

  inputChange(event: any) {
    var date = moment(event, this.mask.toUpperCase().replace("/", '-')).toDate();
    this.fromDate(date);
    this.inputChanged.emit(date);
  }

  dateSelect(event: NgbDate) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const current = this.model ? new Date(this.model) : null;
    const dateParam = new Date(event.year, event.month - 1, event.day);
    const isFuture = dateParam > today;
    const isPast = dateParam < today;

    if (this.model &&
      dateParam.getFullYear() === current.getFullYear() &&
      dateParam.getMonth() === current.getMonth() &&
      dateParam.getDate() === current.getDate()) {
      this.fromDate(this.model);
      return;
    }
    if (!this.allowFuture && isFuture) {
      this.toasterService.error('Data não pode ser maior que hoje');
      this.fromDate(this.model);
      return;
    }

    if (!this.allowPast && isPast) {
      this.toasterService.error('Data não pode ser menor que hoje');
      this.fromDate(this.model);
      return;
    }

    this.toDate(event);
    this.fromDate(this.model);

  }

  toggle(c: NgbInputDatepicker) {
    c.toggle();
    this.calendarToggled.emit(this);
  }

  toDate(date: AppDate): Date {
    if (!date) {
      return null;
    }
    this.model = new Date(date.year, date.month - 1, date.day);
    this.dateChanged.emit(this.model);
    return this.model;
  }

  fromDate(date: Date): AppDate {
    this.componentModel = this.getAppData(date);
    this.dateChanged.emit(date);
    if (this.textInput) {
      this.textInput.writeValue(this.componentModel);
    }
    return this.componentModel;
  }


  getAppData(date: Date): AppDate {
    if (!date) {
      return {} as AppDate;
    }
    date = new Date(date);
    const result = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    } as AppDate;
    return result;

  }
}
