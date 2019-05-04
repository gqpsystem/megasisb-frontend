import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from '../../../data/data.service';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss']
})
export class CompraListComponent implements OnInit {

  lista: any[] = [];
  displayedColumns: string[] = ['acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  SelectFocus: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';

  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.compras().getAll().subscribe(data => {
      this.setData(data);
      console.log(data);
    });
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {

      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  selectRow(event) {
    this.SelectFocus = event.idCompra;

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

  openDialog(compra: any): void {
    /*
    const unidad = unid != null ? unid : new UnidadMedida();
    const dialogRef = this.dialog.open(UnidadEditComponent, {
      data: unidad
    });
    dialogRef.afterClosed().subscribe(result => {

    });
    */
  }

  changeSeacch() {
    if (this.searchMode === 'search') {
      this.searchMode = 'close';
    } else {
      this.searchMode = 'search';
    }
  }

}
