import {CustomerModel} from 'src/vm/models/cutomer-model'
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup,ValidationErrors,ValidatorFn,Validators, } from '@angular/forms';
import {Injectable} from '@angular/core'
import {Gender} from 'src/vm/models/gender'
import { formatDate } from '@angular/common';
import {CustomerService} from 'src/app/services/customer.service'
import {map} from 'rxjs/operators'
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerFormBuilder{

  customerForm:FormGroup
  genderOption:string[]=[]

  constructor(private customer:CustomerModel,
    private builder: FormBuilder,
    private service:CustomerService){
      this.getGenderLabel()
      this.customerForm = this.builder.group({
        id:[this.customer.id,[this.idDuplicateValidator()]],
        name:[this.customer.name,Validators.required],
        lastname:[this.customer.lastname,Validators.required],
        gender:this.getGenderValueFormGroup(),
        dob:[formatDate(this.customer.dobDate,'yyyy-dd-MM', 'en')]
      })
      //if (this.customer.isNew){
      //  this.customerForm.controls['id'].setValidators(this.idDuplicateValidator())
      //}
  }

  getGenderLabel(){
    Object.keys(Gender).forEach(key => {
      if (isNaN(Number(key))) {
        this.genderOption.push(key)
      }
    })
  }

  getGenderValueFormGroup(){
    let genderForm: FormGroup = new FormGroup({})
    Object.keys(Gender).forEach(key => {
      if (!isNaN(Number(key))) {
        if (key.toString() == this.customer.gender.toString())
          genderForm.addControl(Gender[key],this.builder.control(true))
        else
          genderForm.addControl(Gender[key],this.builder.control(false))
      }
    })
    genderForm.setValidators(this.genderValidator())
    return genderForm
  }

  private genderValidator() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      let error :ValidationErrors = null;
      let found = false
      Object.keys(group.controls).forEach(v=>{
        if (found == false){
          if (group.controls[v].value == true){
            found = true
          }
        }
        else if(group.controls[v].value == true){
          error = {'gendererror':'Only one option allowed'}
        }
      })
      if (found == false){
        error = {'gendererror':'Required'}
      }
      return error
    }
  }

  private idDuplicateValidator(): AsyncValidatorFn{
    return(control:FormControl):Observable<ValidationErrors>=>{
      //let error :of(ValidationErrors) =  {'duplicatedIdError':'123456'};
      return this.service.getByCustomerId(control.value)
        .pipe(
          map(item =>{
            if (item == null){
              return {'test':'yes'}
            }
            return {'test':'no'}
          })
        )
    }
  }
}

