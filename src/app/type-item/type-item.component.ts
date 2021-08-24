import { Component, OnInit } from '@angular/core';
import {Type} from '../type.model';
import {TypeService} from '../type.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css']
})
export class TypeItemComponent implements OnInit {

  constructor(public service: TypeService) { }

  ngOnInit(): void {

    this.service.type = {
      name: '',
      _id: "",
    };
  }
  // tslint:disable-next-line:typedef
  submit(){
    if(this.service.type._id==""){
      this.service.postType().subscribe(res => {


        },
        error => {
          console.log('error');
        });
    }
    else {
      this.service.putType().subscribe(res => {
          this.service.getAllTypes();
        },
        error => {
          console.log('error');
        });
    }
}


  resetForm() {
    this.service.type = {
      name: 'the type name',
      _id: "",
    };

  }

}
