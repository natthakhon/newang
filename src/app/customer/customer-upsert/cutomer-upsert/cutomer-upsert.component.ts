import { Component, OnInit, } from '@angular/core';
import {CustomerModel} from 'src/vm/models/cutomer-model'
import {FormGroup,FormBuilder} from '@angular/forms'
import {CustomerFormBuilder} from 'src/app/form-builder/customer/customer-builder'
import {DataProvider} from 'src/app/provider/data/data'
import {CustomerService} from 'src/app/services/customer.service'

@Component({
  selector: 'app-cutomer-upsert',
  templateUrl: './cutomer-upsert.component.html',
  styleUrls: ['./cutomer-upsert.component.css']
})
export class CutomerUpsertComponent implements OnInit {

  customer:CustomerModel
  customerForm:FormGroup
  genderLabel:string[]

  constructor(private fb: FormBuilder
    ,private provider:DataProvider
    ,private service:CustomerService)
  {

  }

  ngOnInit() {
    this.customer = this.provider.customerData
    let form = new CustomerFormBuilder(this.customer,this.fb,this.service)
    this.customerForm = form.customerForm
    this.genderLabel = form.genderOption
  }

}
