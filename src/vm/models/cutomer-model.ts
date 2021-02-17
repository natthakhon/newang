import {AddressModel} from '../models/address-model'
import {Gender} from '../models/gender'
import {BaseModel} from 'src/vm/models/BaseModel'

export class CustomerModel extends BaseModel{
  id : string
  name: string
  lastname: string
  bod: string
  age:number
  gender: Gender
  addresses: AddressModel[]
  genderString:string
  dobDate:Date

  constructor(id : string
    ,name: string
    ,lastname: string
    ,bod: string
    ,gender:Gender
    ,isnew:boolean){
      super(isnew)
      this.id = id
      this.name = name
      this.lastname = lastname
      this.bod = bod
      this.gender = gender
      this.genderString = Gender[this.gender.toString()]
      this.dobDate = new Date(Date.parse(this.bod))
    }

}
