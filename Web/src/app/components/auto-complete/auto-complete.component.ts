import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit, OnChanges {

  @Input()
  placeholder: string;
  @Input()
  model: any;
  @Input()
  items: any[];
  @Input()
  label: string;
  @Input()
  property: string;
  @Input()
  id: number;
  @Input()
  disabled: boolean;
  @Input()
  editable = true;
  @Input()
  size: string;
  @Input()
  textLimit: number;
  @Input()
  placement: string = 'bottom-right';

  @Output()
  itemSelected: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('element', { static: false })
  element: ElementRef;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  selectedItems: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && changes.model.currentValue !== changes.model.previousValue) {
      // this.setDefault();
    }
    if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
      this.sort();
    }

  }

  sort() {
    const property = this.property;
    this.items.sort((a, b) => {
      if (a[property] > b[property]) {
        return 1;
      }
      if (a[property] < b[property]) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  ngOnInit() {
    this.id = this.id || this.generateId();
  }

  generateId() {
    return Math.floor((Math.random() * 6) + 1);
  }

  limit(text: string): string {
    if (this.textLimit && text.length > this.textLimit) {
      return `${text.substr(0, this.textLimit)}...`
    }
    return text;
  }


  formatter = (x) => x[this.property];

  selectItem(event$: any) {
    this.select(event$.item);
  }

  select(item: any) {
    const index = this.items.findIndex(x => x.id === item.id);
    if (index < 0) {
      this.items.push(item);
    }

    if (index < 0) {
      this.selectedItems.push(item);
    }
    this.model = item;
    this.itemSelected.emit(item);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.items.filter(v => v[this.property].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


}
