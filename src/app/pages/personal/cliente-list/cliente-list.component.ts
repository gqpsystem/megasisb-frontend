import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { Cliente } from 'src/app/model/cliente.model';
import { ClienteEditComponent } from '../cliente-edit/cliente-edit.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {

  displayColumn: string[] = ['nombre', 'apellido' , 'documento', 'tipoDocumento', 'telefono' , 'direccion' , 'observacion', 'acciones'];

  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search';
  SelectFocus: string;

  constructor(public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.clientes().getAll().subscribe(data => {
      this.setData(data);
      this.dataSource.filterPredicate  = (dato, filter: string) => {
        const dataStr = dato.persona.nombre.toLowerCase() + dato.observacion  + dato.persona.apellido +
                        dato.persona.numDocumento + dato.persona.telefono + dato.persona.direccion
                        + dato.persona.tipoDocumento.abreviatura.toLowerCase();
        
        return dataStr.indexOf(filter) !== -1;
      };
    });
    this.dataService.providers().cambio.subscribe(data => { this.setData(data) });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    });
  }
  selectRow(event) {
    this.SelectFocus = event.idCliente;

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

  changeSeacch() {
    if (this.searchMode === 'search') {
      this.searchMode = 'close';
    } else {
      this.searchMode = 'search';
    }
  }

  openDialog(cliente: any): void {
    const client = cliente != null ? cliente : new Cliente()
    this.dialog.open(ClienteEditComponent, {
      width: '1200px',
      data: client
    });
  }

}
