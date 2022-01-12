import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { BaseService } from '../services/BaseService';
import { HttpService } from '../services/HttpService';
import { ImgResizeComponent } from './imgResize/imgResizeComponent';
import { SessionStorageService } from './util/session-storage.service';

@NgModule({
  declarations: [ImgResizeComponent],
  providers: [HttpService, BaseService, SessionStorageService],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, DirectivesModule, PipesModule, AvatarModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    ImgResizeComponent,
    AvatarModule
  ]
})
export class SharedModule { }
