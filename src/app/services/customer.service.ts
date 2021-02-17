import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environment';
import {BaseService} from './base.service'
import {CustomerModel} from 'src/vm/models/cutomer-model'

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {

constructor(protected http: HttpClient) {
    super(http)
  }

  getById(id: string): Observable<CustomerModel> {
    throw new Error('Method not implemented.');
  }

  getByCustomerId(id:string):Observable<CustomerModel>{
    return this.baseGet(this.apiurl+environment.urlsuffix.customer.getbystudentid+id
      ,'getByCustomerId')
  }

  getByCustomerName(name:string):Observable<CustomerModel[]>{
    return this.baseGetList(this.apiurl+environment.urlsuffix.customer.getbystudentName+name
      ,'getByCustomerName')
  }
}
