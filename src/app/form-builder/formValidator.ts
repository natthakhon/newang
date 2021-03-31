import {AsyncValidatorFn, FormControl, FormGroup,ValidationErrors,ValidatorFn} from '@angular/forms'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export class FormValidator{
  public static CheckAllowed(maxCheckedAllowed:number,error:ValidationErrors):ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      let checked = Object.keys(group.controls).filter(k=>group.controls[k].value == true).length
      if (checked == maxCheckedAllowed){
        return null
      }
      return error
    }
  }
}
