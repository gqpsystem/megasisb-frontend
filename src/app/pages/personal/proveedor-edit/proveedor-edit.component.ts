import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-proveedor-edit',
  templateUrl: './proveedor-edit.component.html',
  styleUrls: ['./proveedor-edit.component.scss']
})
export class ProveedorEditComponent implements OnInit {


  id: number;
  form: FormGroup;
  fileUpload: File = null;
  persona: any;
  edicion = false ;
  documentos: any[] ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialgoRef: MatDialogRef<ProveedorEditComponent>,
    private fm: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadFormBuilder();
    this.listarDocumento();
    this.loadData();
  }

  loadData(){
    this.edicion = this.data.idProveedor !== undefined ;
    console.log(this.data);
    if (this.edicion) {
      this.id = this.data.idProveedor ;
      this.dataService.proveedores().findById(this.id).subscribe(data => {

        this.form.controls.proveedor.patchValue({
          idProveedor: data.idProveedor,
          ciudad: data.ciudad,
          email: data.email ,
          laboratorio: data.laboratorio ,
          razonSocial: data.razonSocial

        });
        this.buildData(data.persona);
      });

    }
  }

  buildData(data) {
    this.form.controls.persona.patchValue(data);
  }

  listarDocumento(){
    this.dataService.documentos().getAll().subscribe(data => {
      this.documentos = data ;
    });
  }
  loadFormBuilder() {
    this.form = this.fm.group({

      persona: this.fm.group({
        idPersona: [null],
        apellido: [null, Validators.compose([Validators.required])],
        direccion: [null, Validators.compose([Validators.required])],
        nombre: [null, Validators.compose([Validators.required])],
        numDocumento: [null, Validators.compose([Validators.required])],
        telefono: [null, Validators.compose([Validators.required])],
        tipoDocumento: [null, Validators.compose([Validators.required])]
      }),
      proveedor: this.fm.group({
        idProveedor: [null],
        ciudad: [null, Validators.compose([Validators.required])],
        email : [null, Validators.compose([Validators.required])],
        laboratorio:   [null, Validators.compose([Validators.required])],
        razonSocial : [null, Validators.compose([Validators.required])],
        estado : 'ACTIVO'
      }),
    });
  }

  compareDocumento(x: any , y:any): boolean{
    return x && y ? x.idTipoDocumento === y.idTipoDocumento : x === y;
  }

  save() {

    if (this.edicion) {
      //update
      this.dataService.proveedores().update(this.form.value).subscribe(data => {
        this.dataService.proveedores().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('Se Actualizo con éxito!');
        });
      });
    } else {
      //insert
      this.dataService.proveedores().create(this.form.value).subscribe(data => {
          this.dataService.proveedores().getAll().subscribe(p => {
            this.dataService.providers().cambio.next(p);
            this.dataService.providers().mensaje.next('Se Registro con éxito!');
          });
      });
    }
    this.dialgoRef.close();
  }



}
