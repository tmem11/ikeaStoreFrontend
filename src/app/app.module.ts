import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field/';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';





import { AppComponent } from './app.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypeItemComponent } from './type-item/type-item.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatOptionModule} from "@angular/material/core";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import { HeaderComponent } from './header/header.component';
import { TypeTableComponent } from './type-table/type-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {TypeService} from "./type.service";
import { TableExampleComponent } from './table-example/table-example.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule, Routes} from "@angular/router";
import { FurnitureItemComponent } from './furniture-item/furniture-item.component';
import { FurnitureListComponent } from './furniture-list/furniture-list.component';

const appRoutes :Routes=[
  {path: 'home',component:TypesListComponent},
  {path: 'test',component:TypeTableComponent},
  {path: '',component:TypesListComponent},
  {path: 'furniture',component:FurnitureListComponent},



];


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    TypesListComponent,
    TypeItemComponent,
    HeaderComponent,
    TypeTableComponent,
    TableExampleComponent,
    FurnitureItemComponent,
    FurnitureListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),


  ],
  providers: [TypeService],
  bootstrap: [AppComponent],
  entryComponents:[TypeItemComponent]
})
export class AppModule { }
