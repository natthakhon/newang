import { Component } from '@angular/core';
import {StandardSearchForm} from 'src/vm/standard-search'
import {CustomerModel} from 'src/vm/models/cutomer-model'
import {CustomerService} from 'src/app/services/customer.service'
import {map} from 'rxjs/operators'
import {ModelConverter} from 'src/vm/models/converter/model-converter'

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent extends StandardSearchForm<CustomerModel> {

  searchResult:CustomerModel[] = [];
  customer:CustomerModel;
  findTitle: string='Find Customer';

  constructor(private service:CustomerService) {
    super()
  }

  addSearchCriterias() {
    this.searchCriterias.push('name')
    this.searchCriterias.push('id')
  }


  search(){

    if (this.selectedCriteria === 'id'){
      this.service.getByCustomerId(this.searchValue)
      .pipe(
        map(async item =>{
          let customerItem = await ModelConverter.convert2Customer(item)
          return customerItem
        })
      ).subscribe(async item=>
        {
          this.searchResult = []
          this.searchResult.push(await item)
        })
    }

    if (this.selectedCriteria === 'name'){
      this.service.getByCustomerName(this.searchValue)
      .pipe(
        map(async items=>{
          let customers:CustomerModel[] =[]
          for await(let i of items){
            let customerItem = await ModelConverter.convert2Customer(i)
            customers.push(customerItem)
          }
          return customers
        })
      ).subscribe(async data=>
        {
          let result = await data
          this.searchResult = []
          result.forEach(r=>{
            this.searchResult.push(r)
          })
        });
    }
  }
}
