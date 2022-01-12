import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ImgService } from './ImgService';
import { environment } from 'src/environments/environment';

@Component({
  template: `
    <img *ngIf="path" [(src)]="path" alt="{{ image }} " [class]="cssClass" [style]="style" />
  `,
  selector: 'app-img-resize',
  providers: [ImgService]
})
export class ImgResizeComponent implements OnInit, OnChanges {
  public path: string;
  public style: string;
  @Input() public controller: string;
  @Input() public image: string;
  @Output() imageChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() public cssClass: string;
  @Input() public w: number;
  @Input() public h: number;
  @Input() public inline = false;



  constructor(private service: ImgService) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.image) {
      this.load();
    }
  }
  ngOnInit() {
    this.load();
  }

  load() {
    if (this.inline) {
      this.getImagData();
    } else {
      this.getPath();
    }

    this.style = 'min-width:' + this.w + 'px; min-height:' + this.h + 'px;';
  }

  getPath() {
    this.service.controller = this.controller;

    this.path = environment.apiAddress + '/' + this.controller + '/image/' + this.image + '?w=' + this.w + '&h=' + this.h;
  }

  getImagData() {
    this.service.controller = this.controller;
    // this._service.image(this.image, this.controller, this.w, this.h, this.inline).subscribe(result => {
    //   this.path = result;
    // });
  }
}
