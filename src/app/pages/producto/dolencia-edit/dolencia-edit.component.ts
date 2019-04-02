import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-dolencia-edit',
  templateUrl: './dolencia-edit.component.html',
  styleUrls: ['./dolencia-edit.component.scss']
})
export class DolenciaEditComponent implements OnInit {


  id: number;
  form: FormGroup;

  constructor(private dataService: DataService ,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DolenciaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id = this.data.idDolencia;
    this.loadDataFrom();
  }

  initFormBuilder() {
    this.form =  this.formBuilder.group({
      idDolencia: [null],
      dolencia: [null,  Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.id != null && this.data.idDolencia > 0){
      this.dataService.dolencias().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.id != null && this.data.idDolencia > 0) {
      //update
      this.dataService.dolencias().update(this.form.value).subscribe(data => {
        this.dataService.dolencias().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.dolencias().create(this.form.value).subscribe(data => {
        this.dataService.dolencias().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

}
