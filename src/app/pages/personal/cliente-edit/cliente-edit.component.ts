import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  formPerson: FormGroup;
  fileUpload: File = null;
  persona: any;
  edicion = false ;
  documentos: any[] ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialgoRef: MatDialogRef<ClienteEditComponent>,
    private fm: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadFormBuilder();
    this.listarDocumento();
    this.loadData();
  }

  loadData(){
    this.edicion = this.data.idCliente !== undefined ;

    if (this.edicion) {
      this.id = this.data.idCliente ;
      this.dataService.clientes().findById(this.id).subscribe(data => {

        this.form.controls.cliente.patchValue({
          idCliente: data.idCliente,
          observacion: data.observacion

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
      cliente: this.fm.group({
        idCliente: [null],
        observacion: [null, Validators.compose([Validators.required])]
      }),
    });
  }

  compareDocumento(x: any , y:any): boolean{
    return x && y ? x.idTipoDocumento === y.idTipoDocumento : x === y;
  }

  save() {

    if (this.edicion) {
      //update
      this.dataService.clientes().update(this.form.value).subscribe(data => {
        this.dataService.clientes().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    } else {
      //insert
      this.dataService.clientes().create(this.form.value).subscribe(data => {
          this.dataService.clientes().getAll().subscribe(p => {
            this.dataService.providers().cambio.next(p);
            this.dataService.providers().mensaje.next('Se Registro con éxito!');
          });
      });
    }
    this.dialgoRef.close();
  }



}
