import {FormGroup,FormBuilder} from '@angular/forms'

export class FormCreator{
  public static BuildOptionFromEnum(e:any,builder: FormBuilder,deafultValue:number=0):FormGroup{
    let formgroup: FormGroup = new FormGroup({})
    Object.keys(e).forEach(key => {
      if (!isNaN(Number(key))) {
        if (key == deafultValue.toString()){
          formgroup.addControl(e[key],builder.control(true))
        }
        else{
          formgroup.addControl(e[key],builder.control(false))
        }
      }
    })
    return formgroup
  }
}
