import {CustomerModel} from 'src/vm/models/cutomer-model'
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup,ValidationErrors,Validators, } from '@angular/forms';
import {Injectable,ViewChild} from '@angular/core'
import {Gender} from 'src/vm/models/gender'
import { formatDate } from '@angular/common';
import {CustomerService} from 'src/app/services/customer.service'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import {FormCreator} from 'src/app/form-builder/formCreator'
import {FormValidator} from 'src/app/form-builder/formValidator'
import {BaseFormBuilder} from 'src/app/form-builder/Base-form-Builder'
import {AddressUpsertComponent} from 'src/app/address/address-upsert/address-upsert/address-upsert.component'

@Injectable()
export class CustomerFormBuilder extends BaseFormBuilder<CustomerModel,CustomerService>{

  @ViewChild(AddressUpsertComponent,{static :true}) addressComponent:AddressUpsertComponent
  genderOption:string[]=[]

  constructor(protected customer:CustomerModel,
    protected service:CustomerService,
    protected builder: FormBuilder,
    ){
      super(customer,service,builder)
      this.getGenderLabel()
      this.buildForm()
  }

  buildForm(){
    this.form = this.builder.group({
      id:[this.customer.id,[Validators.required],[this.idDuplicateValidator()]],
      name:[this.customer.name,[Validators.required]],
      lastname:[this.customer.lastname,[Validators.required]],
      gender:FormCreator.BuildOptionFromEnum(Gender,this.builder,this.customer.gender),
      dob:[formatDate(this.customer.dobDate,'yyyy-dd-MM', 'en')],

    })

    this.form.controls['gender'].setValidators(FormValidator.CheckAllowed(1,{'gendererror':'One option needed'}))
  }

  getGenderLabel(){
    Object.keys(Gender).forEach(key => {
      if (isNaN(Number(key))) {
        this.genderOption.push(key)
      }
    })
  }

  private idDuplicateValidator(): AsyncValidatorFn{
    return(control:FormControl):Observable<ValidationErrors>=>{
      return this.service.getByCustomerId(control.value)
        .pipe(
        map(item =>{
          if (item != undefined && this.customer.isNew){
               return {'duplicatedIdError':'Existing Id'}
              }
              return null
            })
          )
      }
    }
  }

