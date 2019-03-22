import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar7.jpg', weight: 'Alberto Ruiz', symbol: 'H'},
  {position: 2, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar5.jpg', weight: 'Reymer Nilton', symbol: 'He'},
  {position: 3, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar4.jpg', weight: 'Kerly Lopez', symbol: 'Li'},
  {position: 4, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar3.jpg', weight: 'LUREY lopez', symbol: 'Be'},
  {position: 5, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar2.jpg', weight: 'Lisbet Santiago', symbol: 'B'},
  {position: 6, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar6.jpg', weight: 'Romero Aguilar', symbol: 'C'},
  {position: 7, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar5.jpg', weight: 'David Sanchez', symbol: 'N'},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'megabotica-frontend';
  searchMode = 'create' ;
  displayedColumns: string[] = ['position', 'foto', 'nombre', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  changeSeacch(){
    if(this.searchMode === 'create') {
      this.searchMode = 'close' ;
    } else {
      this.searchMode = 'create' ;
    }
  }
}
