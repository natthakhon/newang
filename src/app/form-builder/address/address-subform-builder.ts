import { AddressModel} from 'src/vm/models/address-model'
import { AsyncValidatorFn, FormArray, FormBuilder, FormControl, FormGroup,ValidationErrors,ValidatorFn,Validators, } from '@angular/forms';
import {AddressType} from 'src/vm/models/address-type'
import { HttpClient, } from '@angular/common/http';
import { ZipFileReader } from 'src/app/js/FileReader';
import { ZipCodeFile } from 'src/app/js/ZipCodeFile';

export class AddressSubFormBuilder{

  form:FormArray
  addressOption:string[]=[]
  zips:Promise<ZipCodeFile[]>

  constructor(private addresses:AddressModel[]
    , private builder:FormBuilder
    , private httpclient:HttpClient){

    this.getZips()
    this.getAddressLabel()
    this.form = new FormArray([])
    this.addresses.forEach(address => {
      this.form.push(this.buildAddress(address))
    });
  }

  getAddressLabel(){
    Object.keys(AddressType).forEach(key => {
      if (isNaN(Number(key))) {
        this.addressOption.push(key)
      }
    })
  }

  getZips(){
    let z = new ZipFileReader(this.httpclient)
    this.zips = z.readfile()
  }

  private buildAddress(model:AddressModel):FormGroup{
    let fg = this.builder.group({
      'type':[AddressType[model.addressType]],
      'address1':[model.address1,Validators.required],
      'address2':[model.address2,Validators.required],
      'zip':[model.zip.toString(),[Validators.required]],
      'umphur':[model.umphur,Validators.required],
      'tumbol':[model.tumbol,Validators.required],
      'delete':[false]
    })
    return fg
  }

  static isZipValid(zipfile:ZipCodeFile[]):ValidatorFn{
    return (control:FormControl):ValidationErrors=>{
      if (zipfile.filter(p=>p.Zip==control.value).length == 0){
        return {'notvalidZip':'Not a valid zip code'}
      }
      return null
    }
  }

  static isUmphurValid(zipfile:ZipCodeFile[]):ValidatorFn{
    return (control:FormControl):ValidationErrors=>{
      if (zipfile.filter(p=>p.Khet==control.value).length == 0){
        return {'notvalidUmphur':'Not a valid umphur'}
      }
      return null
    }
  }

  static isTumbolValid(zipfile:ZipCodeFile[]):ValidatorFn{
    return (control:FormControl):ValidationErrors=>{
      if (zipfile.filter(p=>p.Tumbol==control.value).length == 0){
        return {'notvalidTumbol':'Not a valid tumbol'}
      }
      return null
    }
  }

  static removeAddress(form:FormArray):FormArray{
    let tempForm = new FormArray([])
    form.controls.forEach(f => {
      if (f.get('delete').value == false){
        tempForm.push(f)
      }
    })
    return tempForm
  }
}
