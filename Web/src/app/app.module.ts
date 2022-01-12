import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { httpInterceptorProviders } from './interceptor-index';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
//#region locale
import localePt from '@angular/common/locales/pt';
import { NgbCustomDaterFormatter } from './custom-date-formatter';

//#endregion
registerLocaleData(localePt, 'pt-BR');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NgbDateParserFormatter, useClass: NgbCustomDaterFormatter },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
  }
}
