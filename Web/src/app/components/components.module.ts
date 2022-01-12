import { NgModule } from '@angular/core';
import { DirectivesModule } from '../directives/directives.module';
import { LibModule } from '../shared/libModule.module';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';
import { PageTitleComponent } from './page-title/page-title.component';
import { ToasterService } from './toaster.service';
import { PageModalComponent } from './modals/page-modal/page-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadButtonModule } from './upload-button/upload-button.module';
import { ThumbnailModule } from './thumbnail/thumbnail.module';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { InputCalendarComponent } from './input-calendar/input-calendar.component';
import { RangeCalendarComponent } from './range-calendar/range-calendar.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    SharedModule,
    LibModule,
    DirectivesModule,
    NgbPaginationModule,
    UploadButtonModule,
    ThumbnailModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgxMaskModule
  ],
  declarations: [
    PageTitleComponent,
    DialogComponent,
    PageModalComponent,
    PaginationComponent,
    AutoCompleteComponent,
    InputCalendarComponent,
    RangeCalendarComponent
  ],
  exports: [
    PageTitleComponent,
    PaginationComponent,
    UploadButtonModule,
    ThumbnailModule,
    AutoCompleteComponent,
    InputCalendarComponent,
    RangeCalendarComponent],
  providers: [DialogService, ToasterService],
  // entryComponents: [DialogComponent]
})
export class ComponentsModule { }
