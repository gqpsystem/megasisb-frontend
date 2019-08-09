import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Producto } from 'src/app/model/producto.model';
import { ProductoEditComponent } from '../producto-edit/producto-edit.component';
import { DataService } from 'src/app/data/data.service';
import { ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface columnDato {
  position: number;
  nameColumn: string;
  description: string;
  state: boolean;
}
const DATA: columnDato[] = [
  { position: 0, nameColumn: 'precioVenta', description: 'Precio de Venta', state: true },
  { position: 1, nameColumn: 'lote', description: 'Numero de Lote', state: false },
  { position: 2, nameColumn: 'producto', description: 'Nombre del producto', state: true },
  { position: 3, nameColumn: 'precioCompra', description: 'Precio de Compra', state: true },
  { position: 4, nameColumn: 'fechaVencimiento', description: 'fecha de vencimiento', state: true },
  { position: 5, nameColumn: 'area', description: 'area', state: false },
  { position: 6, nameColumn: 'categoria', description: 'categoria', state: false },
  { position: 7, nameColumn: 'codigo', description: 'codigo', state: true },
  { position: 8, nameColumn: 'dolencia', description: 'dolencia', state: true },
  { position: 9, nameColumn: 'recomendacion', description: 'Recomendacion', state: false },
  { position: 10, nameColumn: 'stock', description: 'Cantidad', state: true },
  { position: 11, nameColumn: 'medida', description: 'Unidad de Medida', state: false },
  { position: 12, nameColumn: 'laboratorio', description: 'laboratorio', state: false },
];


@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})

export class ProductoListComponent implements OnInit {

  displayColumns: string[] = ['codigo', 'producto', 'precioCompra', 'precioVenta', 'stock', 'fechaVencimiento',
     'acciones'];

  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'open';
  SelectFocus: string;
  displayOption: columnDato[] = DATA;
  constructor(public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar) { }

  public bankFilterCtrl: FormControl = new FormControl();
  public filtradoDolores: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => {
      this.setData(data);
      this.dataSource.filterPredicate = (dato, filter: string) => {
        const dataStr = dato.codigo.toLowerCase()  + dato.numProducto.toLowerCase() + dato.precioCompra + dato.precioVenta + dato.stock
          + dato.fechaVencimiento.toLowerCase() + dato.area.toLowerCase() + dato.laboratorio.toLowerCase() + dato.numLote.toLowerCase()  + dato.dolencia.dolencia.toLowerCase() 
          + dato.unidadMedida.codUnidadmedida.toLowerCase() + dato.recomendacion.toLowerCase() + dato.categoria.categoria.toLowerCase() ;
        return dataStr.indexOf(filter) !== -1;
      };
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
    console.log(this.dataSource);

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  openDialog(product: any): void {
    let producto = product != null ? product : new Producto();
    const dialog = this.dialog.open(ProductoEditComponent, {
      width: '1250px',
      data: producto
    });
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
    this.SelectFocus=event.idProducto;
  }

  

  selectColumn(event) {
    if (this.displayOption[event].state) {
      this.displayColumns.splice(this.displayColumns.length -1, 0 , this.displayOption[event].nameColumn);
    }else {
      this.displayColumns = this.displayColumns.filter(obj => obj !== this.displayOption[event].nameColumn);
    }
    }

}
