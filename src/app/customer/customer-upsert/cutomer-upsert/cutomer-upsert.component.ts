import { Component, OnInit, AfterViewInit } from '@angular/core';
import {CustomerModel} from 'src/vm/models/cutomer-model'
import {FormGroup,FormBuilder, FormControl} from '@angular/forms'
import {CustomerFormBuilder} from 'src/app/form-builder/customer/customer-builder'
import {DataProvider} from 'src/app/provider/data/data'
import {CustomerService} from 'src/app/services/customer.service'
import {AddressSubFormBuilder} from 'src/app/form-builder/address/address-subform-builder'

@Component({
  selector: 'app-cutomer-upsert',
  templateUrl: './cutomer-upsert.component.html',
  styleUrls: ['./cutomer-upsert.component.css']
})
export class CutomerUpsertComponent implements OnInit {

  customer:CustomerModel
  customerForm:FormGroup= new FormGroup({})
  genderLabel:string[]


  constructor(private fb: FormBuilder
    ,private provider:DataProvider
    ,private service:CustomerService)
  {

  }

  ngOnInit() {
    this.customer = this.provider.customerData
    let form = new CustomerFormBuilder(this.customer,this.service,this.fb)
    this.customerForm = form.form
    this.customerForm.addControl('address',new FormControl([]))
    this.genderLabel = form.genderOption
  }

}
