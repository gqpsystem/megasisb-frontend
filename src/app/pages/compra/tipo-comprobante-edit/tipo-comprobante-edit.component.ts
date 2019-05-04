import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../../data/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-tipo-comprobante-edit',
  templateUrl: './tipo-comprobante-edit.component.html',
  styleUrls: ['./tipo-comprobante-edit.component.scss']
})
export class TipoComprobanteEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TipoComprobanteEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.initFormBuilder();
    this.id = this.data.idTipoComprobante;
    this.loadDataFrom();
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idTipoComprobante: [null],
      descripcionDoc: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom() {
    if (this.id != null && this.data.idTipoComprobante > 0) {
      this.dataService.tipoComprobantes().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.id != null && this.data.idTipoComprobante > 0) {
      //update
      this.dataService.tipoComprobantes().update(this.form.value).subscribe(data => {
        this.dataService.tipoComprobantes().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.tipoComprobantes().create(this.form.value).subscribe(data => {
        this.dataService.tipoComprobantes().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

}
