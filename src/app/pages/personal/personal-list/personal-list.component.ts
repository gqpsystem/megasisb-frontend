import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { PersonalEditComponent } from '../personal-edit/personal-edit.component';
import { Personal } from 'src/app/model/personal.model';
export interface columnDato {
  position: number;
  nameColumn: string;
  description: string;
  state: boolean;
}
const DATA: columnDato[] = [
  { position: 0, nameColumn: 'email', description: 'Email', state: true },
  { position: 1, nameColumn: 'fechaIngreso', description: 'Fecha de Ingresoo', state: true },
  { position: 2, nameColumn: 'fechaNacimiento', description: 'Fecha de Nacimiento', state: true },
  { position: 3, nameColumn: 'apellido', description: 'Apellido', state: false },
  { position: 4, nameColumn: 'direccion', description: 'Direccion', state: false },
  { position: 5, nameColumn: 'nombre', description: 'Nombre', state: true },
  { position: 6, nameColumn: 'documento', description: 'Numero de Documento', state: true },
  { position: 7, nameColumn: 'telefono', description: 'Telefono', state: false },
  { position: 8, nameColumn: 'tipoDocumento', description: 'Tipo de Documento', state: true },
  { position: 9, nameColumn: 'sueldo', description: 'Sueldo', state: false },
  { position: 10, nameColumn: 'foto', description: 'Foto', state: true }
];

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  displayColumn: string[] = ['nombre', 'foto', 'documento', 'tipoDocumento' , 'email', 'fechaIngreso',
    'fechaNacimiento', 'acciones'];

  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'open';
  SelectFocus: string;
  displayOption: columnDato[] = DATA;

  constructor(public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.personales().getAll().subscribe(data => {
      this.setData(data);
    });
    this.dataService.providers().cambio.subscribe(data => { this.setData(data) });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    })
  }
  
  selectColumn(event) {
    if (this.displayOption[event].state) {
      this.displayColumn.splice(this.displayColumn.length -1 , 0 , this.displayOption[event].nameColumn);
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

  changeSeacch(mode) {
     if (this.searchMode === 'search') {
      this.searchMode = 'open';
    } else if (this.searchMode === 'view_module') {
      this.searchMode = 'open';
    } else {
      this.searchMode = mode;
    }
  }
  selectRow(event) {
    this.SelectFocus = event.idPersonal;

  }
  openDialog(personal: any): void {
    const persona = personal != null ? personal : new Personal()
    this.dialog.open(PersonalEditComponent, {
      width: '1200px',
      data: persona
    });
  }

}
