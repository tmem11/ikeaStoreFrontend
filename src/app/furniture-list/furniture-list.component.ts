import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TypeService} from "../type.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {FurnitureService} from "../furniture.service";
import {Type} from "../type.model";
import {Furniture} from "../furniture.model";
import {TypeItemComponent} from "../type-item/type-item.component";
import {FurnitureItemComponent} from "../furniture-item/furniture-item.component";

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.css']
})
export class FurnitureListComponent implements OnInit {
  subscription:Subscription;
  displayedColumns: string[] = ['index','color','types','actions'];
  dataSource:  MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  types: Type[] = [];


  constructor(public service: FurnitureService ,private dialog:MatDialog,public typeService: TypeService) {
    this.subscription=this.service.getNotification().subscribe(data=>{
      if(data)
      {
        this.getFurnitures();
      }
    });
  }

  ngOnInit(): void {
    this.getFurnitures()
    this.typeService.getAll().subscribe(res => {
      this.types = res as Type[]
    })

  }

   getFurnitures() {
     this.service.getAll().subscribe(res=>{
       this.dataSource= new MatTableDataSource(res as Furniture[]);
       console.log(this.dataSource);
       // this.changeDetectorRefs.detectChanges();
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort=this.sort;
     })


  }
  delete(object:Type) {
    let id = object._id
    this.service.deleteFurniture(id).subscribe(res => {

    })
  }
  onAddFurniture() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    this.dialog.open(FurnitureItemComponent, {data:new Furniture()});


  }
  onEdit(object:Furniture) {



    const dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    this.dialog.open(FurnitureItemComponent,{data:object});


  }







  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getTypeNameById(id){
  const res= this.types.find(type=>type._id=id)
  return res.name

  }
}
