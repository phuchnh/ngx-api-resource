import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxApiResourceModule } from 'ngx-api-resource';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxApiResourceModule.forRoot({
      baseUrl: 'http://l8-api.test/',
      prefix: '/api'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
