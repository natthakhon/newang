import { AddressType } from "./address-type"

export class AddressModel{
  address1 : string
  address2 : string
  zip: number
  changwad: string
  tumbol:string
  umphur: string
  addressType: AddressType
  constructor(address1 : string
    ,address2 : string
    ,zip: number
    ,type: AddressType
    ,changwad:string
    ,tumbol:string
    ,umphur:string){
      this.address1 = address1
      this.address2 = address2
      this.addressType = type
      this.zip = zip
      this.changwad=changwad
      this.tumbol=tumbol
      this.umphur=umphur
  }
}

