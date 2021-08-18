import { Component, OnInit } from '@angular/core';
import {TypeService} from '../type.service';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {

  constructor(public service: TypeService) { }

  ngOnInit(): void {
    this.service.getAllTypes();
  }

  editData(item){
    this.service.type._id=item._id;
    this.service.type.name=item.name;
  }

  delete(id) {
  this.service.deleteType(id).subscribe(res=>{
    this.service.getAllTypes();

  })

  }
}
