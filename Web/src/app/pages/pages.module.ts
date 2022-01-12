import { NgModule } from '@angular/core';
import { AlbumTypeComponent } from './album-type/album-type.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NgbButtonsModule, NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbRatingModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../components/components.module';
import { DirectivesModule } from '../directives/directives.module';
import { AvatarModule } from 'ngx-avatar';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';



@NgModule({
  declarations: [
    AlbumTypeComponent,
    AlbumComponent,
    ArtistComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PagesRoutingModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbNavModule,
    NgbRatingModule,
    NgbButtonsModule,
    FormsModule,
    DirectivesModule,
    NgbTypeaheadModule,
    NgxMaskModule.forRoot(),
    AvatarModule,
    TableModule,
  ],
  exports: [],
})
export class PagesModule {
  constructor(private config: PrimeNGConfig) {
  }
}
