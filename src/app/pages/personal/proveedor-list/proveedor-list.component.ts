import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { ProveedorEditComponent } from '../proveedor-edit/proveedor-edit.component';
import { Proveedor } from 'src/app/model/proveedor.model';

export interface columnDato {
  position: number;
  nameColumn: string;
  description: string;
  state: boolean;
}
const DATA: columnDato[] = [
  { position: 0, nameColumn: 'ciudad', description: 'Ciudad', state: false },
  { position: 1, nameColumn: 'email', description: 'Email', state: false },
  { position: 2, nameColumn: 'laboratorio', description: 'Laboratorio', state: false },
  { position: 3, nameColumn: 'apellido', description: 'Apellido', state: true },
  { position: 4, nameColumn: 'direccion', description: 'Direccion', state: true },
  { position: 5, nameColumn: 'nombre', description: 'Nombre', state: true },
  { position: 6, nameColumn: 'numdocumento', description: 'Numero de Documento', state: true },
  { position: 7, nameColumn: 'telefono', description: 'Telefono', state: false },
  { position: 8, nameColumn: 'tipoDocumento', description: 'Tipo de Documento', state: true },
  { position: 9, nameColumn: 'razonSocial', description: 'Razon Social', state: true },
];

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.scss']
})
export class ProveedorListComponent implements OnInit {

  displayColumn: string[] = [ 'nombre' , 'apellido' ,'numdocumento' , 'tipoDocumento', 'direccion', 'razonSocial' , 'acciones'];

  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode : string = 'open';
  SelectFocus: string;
  displayOption: columnDato[] = DATA;

  constructor(public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.proveedores().getAll().subscribe(data => {
      this.setData(data);
      this.dataSource.filterPredicate = (dato, filter: string) => {
        const dataStr = dato.ciudad.toLowerCase() + dato.email.toLowerCase() + dato.laboratorio.toLowerCase() + dato.persona.apellido.toLowerCase() +
                        dato.persona.direccion.toLowerCase() + dato.persona.nombre.toLowerCase() + dato.persona.numDocumento.toLowerCase() + 
                        dato.persona.telefono.toLowerCase() + dato.persona.tipoDocumento.abreviatura.toLowerCase()
        ;
        return dataStr.indexOf(filter) !== -1;
      };
    });
  }

  
  selectColumn(event) {
    if (this.displayOption[event].state) {
      this.displayColumn.splice(this.displayColumn.length -1, 0 , this.displayOption[event].nameColumn);
    }else {
      this.displayColumn = this.displayColumn.filter(obj => obj !== this.displayOption[event].nameColumn);
    }
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
    this.SelectFocus = event.idProveedor;

  }
  changeSeacch(mode) {
    if (this.searchMode === 'search') {
      this.searchMode = 'open';
    } else if (this.searchMode === 'view_module') {
      this.searchMode = 'open';
    } else {
      this.searchMode = mode;
    }
  }

  openDialog(proveedor: any): void {
    const pv = proveedor != null ? proveedor : new Proveedor();
    this.dialog.open(ProveedorEditComponent, {
      width: '1200px',
      data: pv
    });
  }


}
