import {Component, Inject, OnInit} from '@angular/core';
import {Type} from '../type.model';
import {TypeService} from '../type.service';
import {NgForm} from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-type-item',
  templateUrl: './type-item.component.html',
  styleUrls: ['./type-item.component.css']
})
export class TypeItemComponent implements OnInit {

  constructor(public service: TypeService,public matDialogRef :MatDialogRef<TypeItemComponent>,@Inject(MAT_DIALOG_DATA)private data:Type ) { }

  ngOnInit(): void {

    this.service.type = {
      name: this.data.name,
      _id: this.data._id,
    };
  }
  // tslint:disable-next-line:typedef
  submit(){
    if(!this.service.type._id){
      this.service.postType().subscribe(res => {


        },
        error => {
          console.log('error');
        });
      this.onClose()
    }

    else {
      this.service.putType().subscribe(res => {
          //this.service.getAllTypes();
          this.onClose()
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
  onClose(){
    this.resetForm()
    this.matDialogRef.close()
  }

}
