import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar7.jpg', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar5.jpg', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar4.jpg', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar3.jpg', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar2.jpg', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar6.jpg', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'http://www.wrraptheme.com/templates/square/html/assets/images/xs/avatar5.jpg', weight: 14.0067, symbol: 'N'},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'megabotica-frontend';
  searchMode = 'create' ;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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
