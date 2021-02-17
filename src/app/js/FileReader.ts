import { HttpClient } from '@angular/common/http';
import {ZipCodeFile} from './ZipCodeFile'

export class ZipFileReader{
  private static zipcodefiles: ZipCodeFile[] = [];
  private txtstrs: string[] = [];
  private zipcodes: string[]=[];
  constructor(private http: HttpClient){  }

  async readfile():Promise<ZipCodeFile[]> {
    if (ZipFileReader.zipcodefiles.length == 0){
      let data = await this.http.get('assets/zip.txt', { responseType: 'text' }).toPromise()
      this.addtoArray(data)
    }
    return ZipFileReader.zipcodefiles
  }

  private addtoArray(data:string){
    let content = data.split('\t');
    content.forEach(element => {
    let con = element.split('\r\n')
    if (con.length > 1){
      con.forEach(item=>{
        this.txtstrs.push(item);
      });
    }else{
      this.txtstrs.push(element);
      }
    })
    this.convert2Address(this.txtstrs)
  }

  private convert2Address(data:string[]){
    ZipFileReader.zipcodefiles = [];
    this.zipcodes = [];
    let changwad = '';
    let khet = '';
    let tumbol = '';
    let zip = '';

    for (let i = 0; i < data.length; i++){
      if (i%4 == 0){
        changwad = data[i];
      }else if(i%4 == 1){
        khet = data[i];
      }else if(i%4 == 2){
        tumbol = data[i];
      }else{
        zip = data[i];
        if (!this.zipcodes.includes(zip)){
          this.zipcodes.push(zip);
        }
        ZipFileReader.zipcodefiles.push(new ZipCodeFile(changwad,khet,tumbol,zip));
      }
    }
  }
}
