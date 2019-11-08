import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.scss']
})
export class ProductoDialogComponent implements OnInit {

  constructor(
    public  dialogRef: MatDialogRef<ProductoDialogComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
  }

}
