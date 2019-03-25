import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { Tipodocumento } from 'src/app/model/tipodocumento';
import { TipodocumentoEditComponent } from '../tipodocumento-edit/tipodocumento-edit.component';

@Component({
  selector: 'app-tipodocumento-list',
  templateUrl: './tipodocumento-list.component.html',
  styleUrls: ['./tipodocumento-list.component.scss']
})
export class TipodocumentoListComponent implements OnInit {

  displayedColumns: string[] = ['abreviatura', 'denominacion', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.tipoDocumentos().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  setData(data) {
    const r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(documento: any): void {
    const tipodoc = documento != null ? documento : new Tipodocumento();
    const dialogRef = this.dialog.open(TipodocumentoEditComponent, {
      data: tipodoc
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
