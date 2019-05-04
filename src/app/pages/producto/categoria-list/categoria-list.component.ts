
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { CategoriaEditComponent } from '../categoria-edit/categoria-edit.component';
import { Categoria } from 'src/app/model/categoria.model';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

  displayedColumns: string[] = [ 'categoria', 'estado', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';
  SelectFocus: string;

  constructor(private dataService: DataService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.categorias().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }

  setData(data) {
    let r = data;
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

  selectRow(event) {
    this.SelectFocus = event.idCategoria;

  }

  openDialog(categor: any): void {
    let categoria = categor != null ? categor : new Categoria();
    const dialogRef = this.dialog.open(CategoriaEditComponent, {
      data: categoria
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
