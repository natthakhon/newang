import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerSearchComponent} from 'src/app/customer/customer-search/customer-search.component'
import {CutomerUpsertComponent} from 'src/app/customer/customer-upsert/cutomer-upsert/cutomer-upsert.component'
import {RefreshComponent} from 'src/app/refresh/refresh.component'

const routes: Routes = [
  { path: '', redirectTo: '/customerSearch', pathMatch: 'full' },
  { path: 'customerSearch', component: CustomerSearchComponent },
  { path: 'customerUpsert', component: CutomerUpsertComponent },
  { path: 'refresh', component: RefreshComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
