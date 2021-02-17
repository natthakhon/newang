export class DateUtil{
  static diffYears(dateend:Date,dateStart:Date):number{
    let diff =(dateend.getTime() - dateStart.getTime())/1000
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
  }
}
