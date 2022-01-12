import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './thumbnail.component';



@NgModule({
  declarations: [ThumbnailComponent],
  exports: [ThumbnailComponent],
  imports: [
    CommonModule,
  ]
})
export class ThumbnailModule { }
