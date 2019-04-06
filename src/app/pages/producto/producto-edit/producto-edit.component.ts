import { DataService } from 'src/app/data/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit {

  id: number;
  form: FormGroup;
  dolencias: any[];
  categorias: any[];
  medidas: any[];
  lstunidadmedidas: any[] = [];
  presentaciones: any[];
  ImageProducto = 'https://www.genericosdelimpieza.com/wp-content/uploads/2018/04/pastillas-de-cloro.png';
  fileUpload: File = null;
  productoFile: File = null;

  constructor(public dialogRef: MatDialogRef<ProductoEditComponent>, private fb: FormBuilder, public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }



  ngOnInit() {
    this.listarDolencia();
    this.listarMedida();
    this.listarCategoria();
    this.initFormBuilder();
    this.listarPresenacion();
    this.id = this.data.idProducto;
    this.loadFormField();

  }

  initFormBuilder() {
    this.form = this.fb.group({
      idProducto: [null],
      codigo: [null, Validators.compose([Validators.required])],
      numProducto: [null, Validators.compose([Validators.required])],
      precioCompra: [null, Validators.compose([Validators.required])],
      precioVenta: [null, Validators.compose([Validators.required])],
      stock: [null, Validators.compose([Validators.required])],
      fechaVencimiento: [null, Validators.compose([Validators.required])],
      numLote: [null, Validators.compose([Validators.required])],
      estado: 'ACTIVO',
      area: [null, Validators.compose([Validators.required])],
      laboratorio: [null, Validators.compose([Validators.required])],
      recomendacion: [null, Validators.compose([Validators.required])],
      categoria: [null, Validators.compose([Validators.required])],
      unidadMedida: [null, Validators.compose([Validators.required])],
      dolencia: [null, Validators.compose([Validators.required])],
      presentacion: [null, Validators.compose([Validators.required])],
    });
  }


  changeImageProducto(event) {


    this.fileUpload = event.target.files.item(0);
    const file = event.target.files[0];
    this.productoFile = file;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageProducto = event.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
    console.log(this.fileUpload);
  }


  listarDolencia() {
    this.dataService.dolencias().getAll().subscribe(data => this.dolencias = data);
  }

  compareDolencia(x: any, y: any): boolean {
    return x && y ? x.idDolencia === y.idDolencia : x === y;
  }

  listarMedida() {
    this.dataService.unidadMedidas().getAll().subscribe(data => this.medidas = data);
  }

  compareUnidadMedida(x: any, y: any): boolean {
    return x && y ? x.idUnidadmedida === y.idUnidadmedida : x === y;
  }

  listarCategoria() {
    this.dataService.categorias().getAll().subscribe(data => this.categorias = data);
  }

  compareCategoria(x: any, y: any): boolean {
    return x && y ? x.idCategoria === y.idCategoria : x === y;
  }

  listarPresenacion() {
    this.dataService.presentaciones().getAll().subscribe(data => this.presentaciones = data);
  }

  comparePresentacion(x: any, y: any): boolean {
    return x && y ? x.idPresentacion === y.idPresentacion : x === y;
  }

  loadFormField() {

    if (this.id != null && this.data.idProducto > 0) {
      this.dataService.productos().findById(this.id).subscribe(data => this.form.patchValue(data));
    }
  }

  save() {
    const producto = (JSON.stringify(this.form.value));
    const formData = new FormData();

    formData.append('file', this.fileUpload);
    formData.append('product', producto);

    if (this.id != null && this.data.idProducto > 0) {
      this.dataService.productos().update(formData).subscribe(data => {
        this.dataService.productos().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico');
        });
      });
    } else {
      this.dataService.productos().create(formData).subscribe(data => {
        this.dataService.productos().getAll().subscribe(cuent => {
          this.dataService.providers().cambio.next(cuent);
          this.dataService.providers().mensaje.next('se registro');
        });
      });

    }
    this.dialogRef.close();
  }
}
