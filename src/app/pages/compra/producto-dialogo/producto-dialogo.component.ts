import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../data/data.service';
@Component({
  selector: 'app-producto-dialogo',
  templateUrl: './producto-dialogo.component.html',
  styleUrls: ['./producto-dialogo.component.scss']
})
export class ProductoDialogoComponent implements OnInit {
  lista: any[] = [];
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'cantidaditem', 'precioCompra', 'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<ProductoDialogoComponent>,private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => this.setData(data));
    this.dataService.providers().cambio.subscribe(data => this.setData(data));
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    }); 
  }

  setData(data) {
    if (data) {
      data.forEach(element => { element.cantidaditem = 1; });
      let r = data;
      this.cantidad = JSON.parse(JSON.stringify(data)).length;
      this.dataSource = new MatTableDataSource(r);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  agregar(data) {
    this.dataService.productos().findById(data.idProducto).subscribe(r => {
      let detalle = {
        precioItem: data.precioCompra,
        cantidaditem: data.cantidaditem,
        importeTotalItem: data.precioCompra * data.cantidaditem,
        producto: r
      }
      this.dataService.providers().dialogo.next(detalle);
    });
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
