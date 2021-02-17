import { Component } from '@angular/core';
import {DataProvider} from 'src/app/provider/data/data'
import {CustomerModel} from 'src/vm/models/cutomer-model'
import { Gender } from 'src/vm/models/gender';
import {Router} from '@angular/router'
import {Location} from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myshop';

  constructor(private provider:DataProvider,
    private router:Router,
    private location:Location){

  }

  onNewCustomer(){
    this.provider.customerData = new CustomerModel('','','',new Date().toString(),Gender.Neither,true)
    
    if (this.location.path() == '/customerUpsert'){
      this.router.navigateByUrl("/refresh",{skipLocationChange:true}).then(()=>{
        this.router.navigate([decodeURI(this.location.path())])
      })
    }
  }
}
