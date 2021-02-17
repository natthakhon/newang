import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ErrorMessage} from 'src/vm/models/error'

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  protected apiurl:string

  constructor(protected http: HttpClient) {
    this.apiurl = environment.apiurl;
  }

  abstract getById(id:string):Observable<T>
  //abstract getById(id:number):Observable<T>
  //abstract getAll():Observable<T[]>

  protected handleError<T>(operation = 'operation',result?:T) {
    return (error: any): Observable<T> => {
      this.log(error,operation)
      return of(result as T);
    };
  }

  private log(err:string,oper:string){
    let log = new ErrorMessage(err,new Date(Date.now()),oper)
    this.http.post<ErrorMessage>(this.apiurl+environment.urlsuffix.log.insertLog,log)
  }

  protected baseGet(suffix:string,operation:string):Observable<T>{
    return this.http.get<T>(suffix).pipe(
      catchError(this.handleError<T>(operation))
    )
  }

  protected baseGetList(suffix:string,operation:string):Observable<T[]>{
    return this.http.get<T[]>(suffix).pipe(
      catchError(this.handleError<T[]>(operation))
    )
  }

}
