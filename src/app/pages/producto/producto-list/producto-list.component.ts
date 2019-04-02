import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Producto } from 'src/app/model/producto.model';
import { ProductoEditComponent } from '../producto-edit/producto-edit.component';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss']
})
export class ProductoListComponent implements OnInit {

  displayColumns: string[] = ['codigo' , 'producto',  'precioCompra' , 'precioVenta' , 'stock', 'vencimiento',
   'area' , 'laboratorio' , 'lote' , 'acciones' ];

  dataSource: MatTableDataSource<any>;
  cantidad: number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search' ;

  constructor(public dialog: MatDialog , private dataService: DataService , private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.dataService.productos().getAll().subscribe(data => {
      this.setData(data);
    });
    this.dataService.providers().cambio.subscribe( data => { this.setData(data) });
    this.dataService.providers().mensaje.subscribe( data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });
    })
  }

  setData(data){
    let r = data ;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource =new MatTableDataSource(r);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


  openDialog(product: any): void{
    let producto =  product != null ? product : new Producto();
    const dialog = this.dialog.open(ProductoEditComponent , {
      width: '1250px',
      data: producto
      });
  }

  changeSeacch() {
    if(this.searchMode === 'search') {
      this.searchMode = 'close' ;
    } else {
      this.searchMode = 'search' ;
    }
  }

}
