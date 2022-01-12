import { Injectable } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class NgbCustomDaterFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? this.getDay(date.day) + this.DELIMITER + this.getMonth(date.month) + this.DELIMITER + date.year : '';
  }

  getDay(day: number) {
    return this.lower10(day);
  }

  getMonth(day: number) {
    return this.lower10(day);
  }

  lower10(value: number) {
    return value < 10 ? `0${value}` : value;
  }

}
