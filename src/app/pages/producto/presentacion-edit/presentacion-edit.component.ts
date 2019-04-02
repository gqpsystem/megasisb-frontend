
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-presentacion-edit',
  templateUrl: './presentacion-edit.component.html',
  styleUrls: ['./presentacion-edit.component.scss']
})
export class PresentacionEditComponent implements OnInit {

  id: number;
  form: FormGroup;

  constructor(private dataService: DataService ,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PresentacionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initFormBuilder();
    this.id=this.data.idPresentacion;
    this.loadDataFrom();
  }

  initFormBuilder(){
    this.form=this.formBuilder.group({
      idPresentacion: [null],
      presentacion: [null,  Validators.compose([Validators.required])],
      descripcion: [null, Validators.compose([Validators.required])]
    });
  }

  private loadDataFrom(){
    if(this.id != null && this.data.idPresentacion > 0){
      this.dataService.presentaciones().findById(this.id).subscribe(data =>{
        this.form.patchValue(data);
      });
    }
    console.log(this.data.presentacion);
  }

  save() {
    if (this.id != null && this.data.idPresentacion > 0) {
      //update
      this.dataService.presentaciones().update(this.form.value).subscribe(data => {
        this.dataService.presentaciones().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      //insert
      this.dataService.presentaciones().create(this.form.value).subscribe(data => {
        this.dataService.presentaciones().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.dialogRef.close();
  }
}
