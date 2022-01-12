import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AsideToggleDirective } from './aside.directive';
import { ClaimDirective } from './claimDirective';
import { EnterDirective } from './enter.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { NlbrDirective } from './nlbr.directive';
import { ProgressCircleDirective } from './progress-circle.directive';
import { ReplaceDirective } from './replaceDirective';
import { ScrollTopDirective } from './scrollTopDirective';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { UploadComponent } from './upload/upload.component';
import { DownloadDirective } from './download.directive';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule, FileUploadModule],
  declarations: [
    EnterDirective,
    ReplaceDirective,
    ClaimDirective,
    ScrollTopDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    ProgressCircleDirective,
    AsideToggleDirective,
    NlbrDirective,
    UploadComponent,
    DownloadDirective,
    BreadcrumbsComponent,
  ],
  exports: [
    EnterDirective,
    ReplaceDirective,
    ClaimDirective,
    ScrollTopDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    ProgressCircleDirective,
    AsideToggleDirective,
    NlbrDirective,
    UploadComponent,
    FileUploadModule,
    DownloadDirective,
    BreadcrumbsComponent
  ]
})
export class DirectivesModule { }
