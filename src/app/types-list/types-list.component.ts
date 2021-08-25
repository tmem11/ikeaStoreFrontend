import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TypeService} from '../type.service';
import {Type} from '../type.model';
import {MatTableDataSource} from "@angular/material/table";
import {DataSource} from "@angular/cdk/collections";
import {Observable, Subscription} from "rxjs";
import {TypeTableItem} from "../type-table/type-table-datasource";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog,MatDialogConfig} from "@angular/material/dialog";
import {TypeItemComponent} from "../type-item/type-item.component";






@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']

})
export class TypesListComponent implements OnInit {
  subscription:Subscription;
  displayedColumns: string[] = ['index','name','actions'];
  dataSource:  MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public service: TypeService ,private dialog:MatDialog) {
    this.subscription=this.service.getNotification().subscribe(data=>{
      if(data)
      {
        this.TypesList();
      }
    });
  }

  ngOnInit(): void {

    this.TypesList();



  }

  editData(item){
    this.service.type._id=item._id;
    this.service.type.name=item.name;
  }

  delete(object:Type) {
    let id=object._id
  this.service.deleteType(id).subscribe(res=>{
    //this.service.getAllTypes();

  })

  }
  TypesList() {
    this.service.getAll().subscribe(res=>{
      this.dataSource= new MatTableDataSource(res as Type[]);
      console.log(this.dataSource);
      // this.changeDetectorRefs.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
    })



  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddType() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    this.dialog.open(TypeItemComponent,dialogConfig);


  }
}
