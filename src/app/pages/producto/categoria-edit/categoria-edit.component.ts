import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss']
})
export class CategoriaEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService ,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoriaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id = this.data.idCategoria;
    this.loadDataFrom();
  }

  initFormBuilder() {
    this.form =  this.formBuilder.group({
      idCategoria: [null],
      categoria: [null,  Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.id != null && this.data.idCategoria > 0){
      this.dataService.categorias().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
  }

  save() {
    if (this.id != null && this.data.idCategoria > 0) {
      //update
      this.dataService.categorias().update(this.form.value).subscribe(data => {
        this.dataService.categorias().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.categorias().create(this.form.value).subscribe(data => {
        this.dataService.categorias().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

}
