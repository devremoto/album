import { Component, OnInit } from '@angular/core';
import { PagingModel } from 'src/app/components/pagination/paging-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentRate = 2;
  noSelected: any;
  constructor(
  ) { }

  async ngOnInit() {
  }



}
