import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerSearchComponent } from './customer/customer-search/customer-search.component';
import { CustomerDisplayComponent } from './customer/customer-display/customer-display.component';
import { AddressDisplayComponent } from './address/address-display/address-display.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CutomerUpsertComponent } from './customer/customer-upsert/cutomer-upsert/cutomer-upsert.component';
import { AddressUpsertComponent } from './address/address-upsert/address-upsert/address-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';
import {DataProvider} from 'src/app/provider/data/data';
import { RefreshComponent } from './refresh/refresh.component'

@NgModule({
  declarations: [
    AppComponent,
    CustomerSearchComponent,
    CustomerDisplayComponent,
    AddressDisplayComponent,
    CutomerUpsertComponent,
    AddressUpsertComponent,
    RefreshComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
