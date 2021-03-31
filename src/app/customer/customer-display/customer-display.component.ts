import { Component, OnInit,Input,OnChanges, SimpleChanges,ChangeDetectionStrategy } from '@angular/core';
import {CustomerModel} from 'src/vm/models/cutomer-model'
import {DataProvider} from 'src/app/provider/data/data'

@Component({
  selector: 'app-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDisplayComponent implements OnInit,OnChanges {

  @Input() customer:CustomerModel

  constructor(private provider:DataProvider) {

   }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {

  }

  provideData(){
    this.provider.customerData = this.customer
  }

}
