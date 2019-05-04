import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { DocumentoEditComponent } from '../documento-edit/documento-edit.component';

@Component({
  selector: 'app-documento-list',
  templateUrl: './documento-list.component.html',
  styleUrls: ['./documento-list.component.scss']
})
export class DocumentoListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';
  displayColumn: string[] = ['abreviatura', 'denominacion', 'acciones'];
  constructor(private dataService: DataService, private snackBar: MatSnackBar, private dialogRef: MatDialog) { }
  cantidad: number;
  SelectFocus: string;

  ngOnInit() {
    this.dataService.documentos().getAll().subscribe(data => {
      this.setData(data);
    });
    this.dataService.providers().cambio.subscribe(data => { this.setData(data) });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    })
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
    this.SelectFocus = event.idTipoDocumento;

  }
  changeSeacch() {
    if (this.searchMode === 'search') {
      this.searchMode = 'close';
    } else {
      this.searchMode = 'search';
    }
  }

  openDialog(dato: any): void {
    const document = dato != null ? dato : new Document();
    console.log(dato);
    this.dialogRef.open(DocumentoEditComponent, {
      data: document
    })
  }


}
