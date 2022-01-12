import { NgModule } from '@angular/core';
import { FooterAdminComponent } from './footer/footer';
import { HeaderAdminComponent } from './header/header';
import { NavMenuAdminComponent } from './navmenu/navmenu';
import { NotificationAdminComponent } from './notification/notification';
import { SliderAdminComponent } from './slider/slider';
import { IndexComponent } from './index/index.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'ngx-avatar';
import { LayoutRoutingModule } from './layout-routing.module';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '../directives/directives.module';
import { SideMenuComponent } from './side-menu/side-menu.component';
@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    LayoutRoutingModule,
    AvatarModule,
    NgbNavModule,
    NgbDropdownModule,
    DirectivesModule
  ],
  declarations: [
    FooterAdminComponent,
    HeaderAdminComponent,
    NavMenuAdminComponent,
    NotificationAdminComponent,
    SliderAdminComponent,
    IndexComponent,
    SideMenuComponent
  ],
  exports: [
    FooterAdminComponent,
    HeaderAdminComponent,
    NavMenuAdminComponent,
    NotificationAdminComponent,
    SliderAdminComponent,
    IndexComponent,
    SideMenuComponent
  ]
})
export class LayoutModule {

  constructor() {
  }
}


