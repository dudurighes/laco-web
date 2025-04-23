import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthInterceptor} from './core/authentication/auth.interceptor';
import {LayoutModule} from './shared/layout/layout.module';
import {SnackBarMessageModule} from './shared/components/snack-bar-message/snack-bar-message.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxMatNativeDateModule} from "@ngxmc/datetime-picker";


@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgxMaskModule.forRoot(),
    SnackBarMessageModule,
    NgxMatNativeDateModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, provideHttpClient(withInterceptorsFromDi()),],
})
export class AppModule {
}
