import { FormBuilder, FormGroup, } from '@angular/forms';

export abstract class BaseFormBuilder<TModel,TService>{

  form:FormGroup;

  constructor(protected model:TModel
    , protected service:TService
    , protected builder:FormBuilder){

    }
  abstract buildForm()
}
