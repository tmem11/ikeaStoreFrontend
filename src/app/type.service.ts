import { Injectable } from '@angular/core';
import {Type} from './type.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  url = 'http://localhost:4400/types';
  types: Type[];
  type: Type;

  constructor(private http: HttpClient) {
  }
  // tslint:disable-next-line:typedef
  getAllTypes(){
    this.http.get(this.url).toPromise().then(res => {
      this.types = res as Type[];

    });
  }
  // tslint:disable-next-line:typedef
  postType(){
    return this.http.post(this.url, this.type);
  }
  putType(){
    return this.http.put(this.url +"/"+ this.type._id, this.type);
  }
  deleteType(id){
    return this.http.delete(this.url +"/"+ id);
  }
}
