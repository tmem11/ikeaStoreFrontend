import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Type} from "./type.model";
import {Furniture} from "./furniture.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  subject =new Subject<any>();
  url = 'http://localhost:4400/furnitures';
  furnitures: Furniture[] = [];
  furniture: Furniture;

  constructor(private http:HttpClient) { }



  public getAll(){
    return  this.http.get(this.url);


  }
  // tslint:disable-next-line:typedef
  postFurniture(){
    return this.http.post(this.url, this.furniture).pipe(map((data=>{
      this.sendNotification(true)

    })))
  }
  putFurniture(){
    return this.http.put(this.url +"/"+ this.furniture._id, this.furniture).pipe(map(data=>{
      this.sendNotification(true)

    }));
  }
  deleteFurniture(id){
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
