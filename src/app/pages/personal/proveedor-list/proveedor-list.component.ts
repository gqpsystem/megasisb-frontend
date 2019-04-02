import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { ProveedorEditComponent } from '../proveedor-edit/proveedor-edit.component';
import { Proveedor } from 'src/app/model/proveedor.model';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.scss']
})
export class ProveedorListComponent implements OnInit {

  displayColumn: string[] = [ 'acciones'];

  dataSource: MatTableDataSource<any>;
  cantidad: number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search' ;

  constructor(public dialog: MatDialog , private dataService: DataService , private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.dataService.proveedores().getAll().subscribe(data => {
      this.setData(data);
    });
  }

  setData(data){
    let r = data ;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource =new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  changeSeacch() {
    if(this.searchMode === 'search') {
      this.searchMode = 'close' ;
    } else {
      this.searchMode = 'search' ;
    }
  }

  openDialog(proveedor: any): void{
    const pv =  proveedor != null ? proveedor : new Proveedor() ;
    this.dialog.open(ProveedorEditComponent , {
      width : '1200px',
      data: pv
    });
  }


}
