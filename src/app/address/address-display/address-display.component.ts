import { Component, OnInit,Input,OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import {AddressModel} from 'src/vm/models/address-model'
import {AddressType} from 'src/vm/models/address-type'
import {ZipCodeFile} from 'src/app/js/ZipCodeFile'

@Component({
  selector: 'app-address-display',
  templateUrl: './address-display.component.html',
  styleUrls: ['./address-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressDisplayComponent implements OnInit,OnChanges {

  @Input() addresses: AddressModel[];
  addressOptions:Map<string,boolean>
  selectedZip!:ZipCodeFile
  zipcodefiles: ZipCodeFile[] = [];

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.createOptions();
  }

  ngOnInit() {

  }

  hasAddress(address:string){
    if (this.addresses != undefined){
      for (let i = 0; i < this.addresses.length; i++) {
        if (this.addresses[i].addressType == AddressType[address]){
          return true;
        }
    }
  }
    return false;

  }

  onAddressCheck(option,check){
    this.addressOptions.set(option,check);
  }

  getAddresstype(type){
    return AddressType[type]
  }

  createOptions(){
    this.addressOptions =new Map()
    for (let item in AddressType) {
      if (isNaN(Number(item))){
        this.addressOptions.set(item,this.hasAddress(item))
      }
    }
  }

}
