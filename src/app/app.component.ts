import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSidenav } from '@angular/material';
import { SinedavService } from './provider/sinedav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'megabotica-frontend';
  searchMode = 'create';
  igv = 0.26;

  @ViewChild('sidenav') public sidenav: MatSidenav;
  constructor(private sidenavService: SinedavService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }


  changeSeacch() {
    if (this.searchMode === 'create') {
      this.searchMode = 'close';
    } else {
      this.searchMode = 'create';
    }
  }
}
