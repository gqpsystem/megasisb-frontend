import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-tipodocumento-edit',
  templateUrl: './tipodocumento-edit.component.html',
  styleUrls: ['./tipodocumento-edit.component.scss']
})
export class TipodocumentoEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TipodocumentoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id = this.data.idTipoDocumento;
    this.loadDataFrom();
  }

  initFormBuilder() {
    this.form = this.formBuilder.group({
      idTipoDocumento: [null],
      abreviatura: [null, Validators.compose([Validators.required])],
      denominacionDoc: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom() {
    if (this.id != null && this.data.idTipoDocumento > 0) {
      this.dataService.tipoDocumentos().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.id != null && this.data.idTipoDocumento > 0) {
      // update
      this.dataService.tipoDocumentos().update(this.form.value).subscribe(data => {
        this.dataService.tipoDocumentos().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico');
        });
      });
    } else {
      // insert
      this.dataService.tipoDocumentos().create(this.form.value).subscribe(data => {
        this.dataService.tipoDocumentos().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }


}
