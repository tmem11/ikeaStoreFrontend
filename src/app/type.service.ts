import { Injectable } from '@angular/core';
import {Type} from './type.model';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypeService {
   subject =new Subject<any>();
  url = 'http://localhost:4400/types';
  types: Type[] = [];
  type: Type;

  constructor(private http: HttpClient) {
  }
  // tslint:disable-next-line:typedef
   public getAllTypes(): Promise<Type[]> {

     if (this.types.length == 0) {

       return this.http.get<Type[]>(this.url).toPromise().then(value => {
         this.types = value;
         return this.types;
       });
     }
     else {

       return new Promise<Type[]>((resolve, reject) => {
         resolve(this.types);
       });
     }
  }
  public getAll(){
    return  this.http.get(this.url);


  }
  // tslint:disable-next-line:typedef
  postType(){
    return this.http.post(this.url, this.type).pipe(map((data=>{
      this.sendNotification(true)

    })))
  }
  putType(){
    return this.http.put(this.url +"/"+ this.type._id, this.type);
  }
  deleteType(id){
    return this.http.delete(this.url +"/"+ id).pipe(map(data=>{
      this.sendNotification(true)

    }));
  }

  sendNotification(value:any)
  {
    this.subject.next({text:value});
  }


  getNotification(){
    return this.subject.asObservable();
  }

}
