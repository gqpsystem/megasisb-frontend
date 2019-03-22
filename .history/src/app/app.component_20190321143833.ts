import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'megabotica-frontend';
  searchMode = 'create' ;

  changeSeacch(){
    if(this.searchMode === 'create') {
      this.searchMode = 'close' ;
    } else {
      this.searchMode = 'create' ;
    }
  }
}
