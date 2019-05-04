import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit , Inject, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { DolenciaEditComponent } from '../dolencia-edit/dolencia-edit.component';
import { Dolencia } from 'src/app/model/dolencia.model';

@Component({
  selector: 'app-dolencia-list',
  templateUrl: './dolencia-list.component.html',
  styleUrls: ['./dolencia-list.component.scss']
})
export class DolenciaListComponent implements OnInit {

  displayedColumns: string[] = [ 'dolencia', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search' ;
  SelectFocus: string;
  
  constructor(private dataService: DataService, private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.dolencias().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator= this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(dolenc: any): void {
    let dolencia = dolenc != null ? dolenc : new Dolencia();
    const dialogRef = this.dialog.open(DolenciaEditComponent, {
      data: dolencia
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
  selectRow(event) {
    this.SelectFocus = event.idDolencia;

  }
}
