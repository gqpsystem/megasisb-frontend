import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data/data.service';
import { Personal } from 'src/app/model/personal.model';

@Component({
  selector: 'app-personal-edit',
  templateUrl: './personal-edit.component.html',
  styleUrls: ['./personal-edit.component.scss']
})
export class PersonalEditComponent implements OnInit {
  imageDefault =
    "https://www.alliedmarketresearch.com/blog/images/user_icon.png";
  id: number;
  form: FormGroup;
  formPerson: any = FormGroup;
  fileUpload: File = null;
  persona: any;
  edicion = false ;
  documentos: any[] ;
  public userFile: any = File ;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialgoRef: MatDialogRef<PersonalEditComponent>,
    private fm: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadFormBuilder();
    this.listarDocumento();
    this.loadData();
  }

  loadData(){
    this.edicion = this.data.idPersonal !== undefined ;

    if (this.edicion) {
      this.id = this.data.idPersonal ;
      this.dataService.personales().findById(this.id).subscribe(data => {

        this.form.controls.personal.patchValue({
          email: data.email ,
          estado: data.estado ,
          fechaNacimiento: data.fechaNacimiento ,
          idPersonal: data.idPersonal,
          fechaIngreso: data.fechaIngreso,
          foto: data.foto,
          sueldo: parseFloat(data.sueldo || 0)
        });
        this.buildData(data.persona);
      });

    }
  }

  buildData(data) {

    this.form.controls.persona.patchValue(data);
  /*
    const tipoDocumeto = this.tipodocumentos.find(
      t => t.idTipodocumento == data.tipoDocumeto.idTipodocumento
    );
    this.form.controls.persona.get("tipoDocumeto").setValue(tipoDocumeto);
   */
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
      personal: this.fm.group({
        idPersonal: [null],
        email: [null, Validators.compose([Validators.required])],
        estado: "ACTIVO",
        fechaIngreso: [null, Validators.compose([Validators.required])],
        fechaNacimiento: [null, Validators.compose([Validators.required])],
        foto: this.imageDefault,
        sueldo: [null, Validators.compose([Validators.required])],
      })
    });
  }

  compareDocumento(x: any , y:any): boolean{
    return x && y ? x.idTipoDocumento === y.idTipoDocumento : x === y;
  }

  save() {

    if (this.edicion) {
      //update
      this.dataService.personales().update(this.form.value).subscribe(data => {
        this.dataService.personales().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next("Se Actualizo con éxito!");
        });
      });
    } else {
      const rep =(JSON.stringify(this.form.value));
      const formData = new FormData();
      formData.append('file' , this.fileUpload);
      formData.append('rep' , rep);
      this.dataService.personales().create(formData).subscribe(data => {
          this.dataService.personales().getAll().subscribe(p => {
            this.dataService.providers().cambio.next(p);
            this.dataService.providers().mensaje.next('Se Registro con éxito!');
          });
      });

    }
    this.dialgoRef.close();
  }

  changeImg(event) {
    this.fileUpload = event.target.files.item(0);
    const file = event.target.files[0];
    this.userFile = file ;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageDefault = event.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
  }
}
