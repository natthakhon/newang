import {Injectable} from '@angular/core'
import {CustomerModel} from 'src/vm/models/cutomer-model'

@Injectable()
export class DataProvider{
  customerData:CustomerModel

  constructor(){}
}
