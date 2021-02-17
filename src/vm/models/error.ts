export class ErrorMessage{
  errmsg:string
  logtime:Date
  operation:string
  constructor(errmsg:string,logtime:Date,operation:string){
    this.errmsg = errmsg
    this.logtime = logtime
    this.operation = operation
  }
}
