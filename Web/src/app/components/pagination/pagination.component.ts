import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { PagingModel } from './paging-model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent<T> implements OnInit {



  @Input() filterQuantity: number[] = [1, 5, 10, 15, 20, 50, 100];
  @Input() paging: PagingModel<T> = new PagingModel<T>();
  @Output() changePage = new EventEmitter();
  @Output() changeQuantity = new EventEmitter();
  @ViewChild('pagination', { static: true }) pagination: NgbPagination;
  @Input() itemsPerPage: number;


  public formPaginacao: FormGroup = new FormGroup({
    itemsPorPagina: new FormControl(0),
  });

  constructor() {
  }

  ngOnInit() {
    this.loadValues();
  }

  loadValues() {

    this.itemsPerPage = this.itemsPerPage ? this.itemsPerPage :
      ((this.filterQuantity && this.filterQuantity.length) ? this.filterQuantity[0] : 5);

    const valorExiste = this.filterQuantity.find(x => x === this.itemsPerPage);
    if (!valorExiste) {
      this.filterQuantity.push(this.itemsPerPage);
    }
    this.filterQuantity.sort((a, b) => a - b);
    this.formPaginacao.patchValue({
      itemsPorPagina: this.itemsPerPage
    });
  }

  changeQuantityEvent($event) {
    this.pagination.page = this.paging.number;
    this.itemsPerPage = this.formPaginacao.value.itemsPorPagina;
    this.changePage.emit({ itemsPerPage: Number(this.itemsPerPage), page: this.paging.number });
    this.changeQuantity.emit(Number(this.itemsPerPage));
  }

  changePageEvent($event) {
    this.paging.number = Number($event);
    // this.itemsPerPage = Number($event.itemsPerPage);
    if ($event) {
      this.changePage.emit({ itemsPerPage: Number(this.itemsPerPage), page: this.paging.number });
      this.changeQuantity.emit(Number(this.itemsPerPage));
    }
  }

}
