import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FillDetailComponent } from './fill-detail/fill-detail.component';
import { BillComponent } from './bill/bill.component';
import { Approuting } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    FillDetailComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    Approuting,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
