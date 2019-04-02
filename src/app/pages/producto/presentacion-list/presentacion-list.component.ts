
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit , Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PresentacionEditComponent } from '../presentacion-edit/presentacion-edit.component';
import { DataService } from 'src/app/data/data.service';
import { Presentacion } from 'src/app/model/presentacion';

@Component({
  selector: 'app-presentacion-list',
  templateUrl: './presentacion-list.component.html',
  styleUrls: ['./presentacion-list.component.scss']
})
export class PresentacionListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['idPresentacion', 'presentacion','descripcion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search' ;

  constructor(private dataService: DataService, private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.presentaciones().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(present:any): void {
    let presentacion = present != null ? present :new Presentacion();
    const dialogRef = this.dialog.open(PresentacionEditComponent, {
      data: presentacion
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  changeSeacch() {
    if(this.searchMode === 'search') {
      this.searchMode = 'close' ;
    } else {
      this.searchMode = 'search' ;
    }
  }

}
