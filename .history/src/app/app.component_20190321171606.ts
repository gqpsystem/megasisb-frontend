import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'https://lh3.googleusercontent.com/-YuZUWA6_26w/WUkgwPYIS_I/AAAAAAAAADI/gZDsSjYoyH8-qp19K-o6zS1nK6iPGQ8VQCEwYBhgL/w140-h140-p/image-portada-dragon.jpg', weight: 20.1797, symbol: 'Ne'},
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
