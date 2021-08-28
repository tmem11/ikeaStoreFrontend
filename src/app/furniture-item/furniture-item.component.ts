import {Component, Inject, OnInit} from '@angular/core';
import {FurnitureService} from "../furniture.service";
import {TypeService} from "../type.service";
import {Type} from "../type.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Furniture} from "../furniture.model";

@Component({
  selector: 'app-furniture-item',
  templateUrl: './furniture-item.component.html',
  styleUrls: ['./furniture-item.component.css']
})
export class FurnitureItemComponent implements OnInit {
  types: Type[] = [];

  constructor(public service: FurnitureService, public typeService: TypeService, public matDialogRef: MatDialogRef<FurnitureItemComponent>, @Inject(MAT_DIALOG_DATA) private data: Furniture) {
  }

  ngOnInit(): void {
    this.service.furniture = {
      codeNumber: this.data.codeNumber,
      color: this.data.color,
      _id: this.data._id,
      price: this.data.price,
      measurs: this.data.measurs,
      types: this.data.types


    };
    this.typeService.getAll().subscribe(res => {
      this.types = res as Type[]
    })
  }

  submit() {
    if (!this.service.furniture._id) {
      this.service.postFurniture().subscribe(res => {


        },
        error => {
          console.log('error');
        });
      this.onClose()
    } else {
      this.service.putFurniture().subscribe(res => {
          //this.service.getAllTypes();
          this.onClose()
        },
        error => {
          console.log('error');
        });
    }

  }

  onClose() {
    this.resetForm()
    this.matDialogRef.close()
  }

  resetForm() {
    this.service.furniture = {
      codeNumber: '',
      color: '',
      _id: '',
      price: null,
      measurs: '',
      types: ''
    };
  }
}
