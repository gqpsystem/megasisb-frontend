import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data/data.service';
import { PersonalEditComponent } from '../personal-edit/personal-edit.component';
import { Personal } from 'src/app/model/personal.model';

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  displayColumn: string[] = [ 'nombre' , 'foto' , 'documento' , 'email' , 'fechaIngreso' ,
                              'fehaNacimiento' , 'acciones'];

  dataSource: MatTableDataSource<any>;
  cantidad: number ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'search' ;

  constructor(public dialog: MatDialog , private dataService: DataService , private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.dataService.personales().getAll().subscribe(data => {
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

  changeSeacch() {
    if(this.searchMode === 'search') {
      this.searchMode = 'close' ;
    } else {
      this.searchMode = 'search' ;
    }
  }

  openDialog(personal: any): void{
    const persona =  personal != null ? personal : new Personal()
    this.dialog.open(PersonalEditComponent , {
      width : '1200px',
      data: persona
    });
  }

}
