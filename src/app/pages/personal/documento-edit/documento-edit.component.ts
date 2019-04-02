import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-documento-edit',
  templateUrl: './documento-edit.component.html',
  styleUrls: ['./documento-edit.component.scss']
})
export class DocumentoEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService ,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DocumentoEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id = this.data.idTipoDocumento;
    this.loadDataFrom();
  }

  initFormBuilder() {
    this.form =  this.formBuilder.group({
      idTipoDocumento: [null],
      denominacionDoc: [null,  Validators.compose([Validators.required])],
      abreviatura: [null,  Validators.compose([Validators.required])],
    });
  }

  private loadDataFrom(){

    if(this.id != null && this.data.idTipoDocumento > 0){


      this.dataService.documentos().findById(this.id).subscribe(data =>{

        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.id != null && this.data.idTipoDocumento > 0) {
      //update
      this.dataService.documentos().update(this.form.value).subscribe(data => {
        this.dataService.documentos().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.documentos().create(this.form.value).subscribe(data => {
        this.dataService.documentos().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

}
