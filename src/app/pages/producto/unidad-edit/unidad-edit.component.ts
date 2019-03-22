import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/data/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-unidad-edit',
  templateUrl: './unidad-edit.component.html',
  styleUrls: ['./unidad-edit.component.scss']
})
export class UnidadEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UnidadEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id=this.data.idUnidadmedida;
    this.loadDataFrom();
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idUnidadmedida:[null],
      codUnidadmedida:[null,Validators.compose([Validators.required])],
      descripcion:[null,Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.id != null && this.data.idUnidadmedida > 0){
      this.dataService.unidadMedidas().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
    console.log(this.data.idUnidadmedida);
  }

  save() {
    if (this.id != null && this.data.idUnidadmedida > 0) {
      //update
      this.dataService.unidadMedidas().update(this.form.value).subscribe(data => {
        this.dataService.unidadMedidas().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });     
    } else {
      //insert
      this.dataService.unidadMedidas().create(this.form.value).subscribe(data => {
        this.dataService.unidadMedidas().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }

}
