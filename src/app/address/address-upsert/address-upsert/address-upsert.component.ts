import { Component, Input, OnInit,OnDestroy  } from '@angular/core';
import { ControlValueAccessor,FormBuilder, FormArray,NG_VALUE_ACCESSOR,NG_VALIDATORS, FormControl,Validator, AbstractControl, ValidationErrors, FormGroup , } from '@angular/forms';
import {forwardRef} from '@angular/core'
import {AddressSubFormBuilder} from 'src/app/form-builder/address/address-subform-builder'
import {AddressModel} from 'src/vm/models/address-model'
import { Subscription } from 'rxjs';
import { HttpClient, } from '@angular/common/http';
import { ZipCodeFile } from 'src/app/js/ZipCodeFile';

@Component({
  selector: 'app-address-upsert',
  templateUrl: './address-upsert.component.html',
  styleUrls: ['./address-upsert.component.css'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AddressUpsertComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AddressUpsertComponent),
    multi: true
  }]
})

export class AddressUpsertComponent implements OnInit,ControlValueAccessor,OnDestroy,Validator   {

  subscriptions: Subscription[] = [];
  val = '';
  addressForm:FormArray= new FormArray([])
  subformBuilder: AddressSubFormBuilder
  @Input() addresses:AddressModel[]
  addressOptions:string[]
  zips:ZipCodeFile[]
  zipcode:string[]=[]
  umphur:string[]=[]
  tumbol:string[]=[]

  constructor(private builder:FormBuilder,private httpclient:HttpClient) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => {}
  onTouch: any = () => {}

  writeValue(obj: any): void {
    this.val = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.addressForm.valid ? null : { addressForm: false};
  }

  async ngOnInit() {
    this.subformBuilder = new AddressSubFormBuilder(this.addresses,this.builder,this.httpclient)
    this.addressForm = this.subformBuilder.form
    this.subscriptions.push(
      this.addressForm.valueChanges.subscribe(value=>{
        this.onChange(value);
        this.onTouch();
      })
    )
    this.addressOptions = this.subformBuilder.addressOption
    this.zips = await this.subformBuilder.zips
    this.addressForm.controls.forEach(form => {
      form.get('zip').setValidators(AddressSubFormBuilder.isZipValid(this.zips))
      form.get('umphur').setValidators(AddressSubFormBuilder.isUmphurValid(this.zips))
      form.get('tumbol').setValidators(AddressSubFormBuilder.isTumbolValid(this.zips))
    });
    this.getzipcode()
  }

  getzipcode(){
    this.umphur = []
    this.tumbol = []
    if (this.zipcode.length ==0){
      this.zips.forEach(z=>{
        if(this.zipcode.filter(p=>p==z.Zip).length==0){
          this.zipcode.push(z.Zip)
        }
        if (this.umphur.filter(u=>u==z.Khet).length == 0){
          this.umphur.push(z.Khet)
        }
        if (this.tumbol.filter(t=>t==z.Tumbol).length == 0){
          this.tumbol.push(z.Tumbol)
        }
      })
    }
  }

  onZipChange(value:string,c:FormControl){
    if (value.length == 5){
      c.setValue('')
      this.umphur = []
      this.zips.filter(z=>z.Zip == value).forEach(item=>{
        if (this.umphur.filter(u=>u == item.Khet).length == 0){
          this.umphur.push(item.Khet)
        }
      })
    }
  }

  onumphurChange(value:string,c:FormControl){
    c.setValue('')
    this.tumbol=[]
    this.zips.filter(z=>z.Khet==value).forEach(item=>{
      if (this.tumbol.filter(t=>t == item.Tumbol).length == 0){
        this.tumbol.push(item.Tumbol)
      }
    })
  }

  remove(){
    let forms = AddressSubFormBuilder.removeAddress(this.addressForm)
    this.addressForm.clear()
    this.addressForm = forms;
  }

}
