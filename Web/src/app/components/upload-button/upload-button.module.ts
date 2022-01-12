import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadButtonComponent } from './upload-button.component';
import { DirectivesModule } from '../../directives/directives.module';



@NgModule({
  declarations: [UploadButtonComponent],
  exports: [UploadButtonComponent],
  imports: [
    CommonModule,
    DirectivesModule
  ]
})
export class UploadButtonModule { }
