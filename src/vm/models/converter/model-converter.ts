import {CustomerModel} from 'src/vm/models/cutomer-model'
import {AddressModel} from 'src/vm/models/address-model'
import {DateUtil} from 'src/app/js/DateUtil'
import {ZipFileReader} from 'src/app/js/FileReader'
import { HttpClient, HttpXhrBackend } from '@angular/common/http'
import {ZipCodeFile} from 'src/app/js/ZipCodeFile'

export class ModelConverter{

  static Zipfile:ZipCodeFile[] = []

  static convert2Customer(response):CustomerModel{
    let customer = new CustomerModel((response as any).customerId
      , (response as any).name
      , (response as any).lastName
      , (response as any).bod
      , (response as any).gender
      , false)

    customer.addresses = ModelConverter.convert2Address((response as any).addresses)
    customer.bod = customer.bod.substring(8,10) +
        '/'+customer.bod.substring(5,7) +
        '/'+customer.bod.substring(0,4)
    customer.age = DateUtil.diffYears(new Date(Date.now()),new Date(customer.bod));

    return customer
  }

  static convert2Address(response): AddressModel[]{
    let customerAddresses : AddressModel[] = []
    let addresses = response as any[]
    addresses.forEach(a=>{
      let address = new AddressModel((a as any).address1
      , (a as any).address2
      , (a as any).zipCode
      , (a as any).addressType
      , (a as any).changwad
      , (a as any).tumbol
      , (a as any).amphur)
      customerAddresses.push(address)
    })
    /*
    let zip = await this.getZipCodeData()
    customerAddresses.forEach(ca=>{
      let zipcodeInfo = zip.find(z=>z.Zip.toString()==ca.zip.toString())
      ca.changwad = zipcodeInfo.Changwad
      ca.tumbol = zipcodeInfo.Tumbol
      ca.umphur = zipcodeInfo.Khet
    })*/
    return customerAddresses
  }

  static async getZipCodeData():Promise<ZipCodeFile[]>{
    if (ModelConverter.Zipfile.length == 0){
      const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
      let reader = new ZipFileReader(http)
      ModelConverter.Zipfile = await reader.readfile()
    }
    return ModelConverter.Zipfile
  }
}
