import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../../../data/data.service';
import { TipoComprobanteEditComponent } from '../tipo-comprobante-edit/tipo-comprobante-edit.component';
import { TipoComprobante } from '../../../model/tipo-comprobante.model';

@Component({
  selector: 'app-tipo-comprobante-list',
  templateUrl: './tipo-comprobante-list.component.html',
  styleUrls: ['./tipo-comprobante-list.component.scss']
})
export class TipoComprobanteListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['descripcion' , 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  SelectFocus: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';

  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.tipoComprobantes().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  selectRow(event) {
    this.SelectFocus = event.idTipoComprobante;

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
    const tipoDocumento = documento != null ? documento : new TipoComprobante();
    const dialogRef = this.dialog.open(TipoComprobanteEditComponent, {
      data: tipoDocumento
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  changeSeacch() {
    if (this.searchMode === 'search') {
      this.searchMode = 'close';
    } else {
      this.searchMode = 'search';
    }
  }

}
