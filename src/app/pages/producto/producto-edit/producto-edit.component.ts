import { DataService } from 'src/app/data/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

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
  ImageProducto = 'http://localhost:8083/api/image/producto/defaul-photo.jpg';
  fileUpload: File = null;
  productoFile: File = null;
  dolores: any[] = [];
  filtromedida: any[] = [];
  filtroCategoria: any[] = [];
  list = [];
  constructor(public dialogRef: MatDialogRef<ProductoEditComponent>, private fb: FormBuilder, public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }



  ngOnInit() {
    this.listarDolencia();
    this.listarMedida();
    this.listarCategoria();
    this.initFormBuilder();
    this.id = this.data.idProducto;
    this.loadFormField();
    this.loadImage();
    this.fuctionsDolencias();

  }
  selectOption(value) {
    this.list = this.form.get('dolencia').value;

  }

  buscardolor(event) {
    if (!event.target.value) {
      this.dolores = this.dolencias;
      return;
    } else {
      let search = event.target.value;

      this.dolores = this.dolencias.filter(bank => bank.dolencia.toLowerCase().indexOf(search.toLowerCase()) > -1);
    }

  }

  buscarmedida(event) {
    this.filtromedida = this.medidas.filter(bank => bank.codUnidadmedida.toLowerCase().indexOf(event.target.value) > -1);
  }
  buscarCategoria(event) {
    this.filtroCategoria = this.categorias.filter(bank => bank.categoria.toLowerCase().indexOf(event.target.value) > -1);
  }

  loadImage() {
    if (this.data.imagen !== undefined) {
      this.ImageProducto = 'http://localhost:8083/api/image/producto/' + this.data.imagen;
    } else {
      fetch('http://localhost:8083/api/image/producto/defaul-photo.jpg').then(response =>
        response.blob()
      ).then(blob => {

        const fil = new File([blob], 'PhotoDefault.png', { type: 'image/png', lastModified: Date.now() });
        this.fileUpload = fil;
      });
    }
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
      imagen: [null, Validators.compose([])]
    });
  }


  changeImageProducto(event) {

    this.fileUpload = event.target.files.item(0);
    const file = event.target.files[0];
    this.productoFile = file;
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageProducto = event.target.result;
    };
    reader.readAsDataURL(this.fileUpload);
    console.log(this.fileUpload);
  }


  listarDolencia() {
    this.dataService.dolencias().getAll().subscribe(data => {

      this.dolencias = data;
      this.dolores = this.dolencias;

    });

  }

  compareDolencia(x: any, y: any): boolean {
    return x && y ? x.idDolencia === y.idDolencia : x === y;
  }

  listarMedida() {
    this.dataService.unidadMedidas().getAll().subscribe(data => {
      this.medidas = data;
      this.filtromedida = data;
    });
  }

  compareUnidadMedida(x: any, y: any): boolean {
    return x && y ? x.idUnidadmedida === y.idUnidadmedida : x === y;
  }

  listarCategoria() {
    this.dataService.categorias().getAll().subscribe(data => {
      this.categorias = data;
      this.filtroCategoria = data;
    });
  }

  compareCategoria(x: any, y: any): boolean {
    return x && y ? x.idCategoria === y.idCategoria : x === y;
  }


  comparePresentacion(x: any, y: any): boolean {
    return x && y ? x.idPresentacion === y.idPresentacion : x === y;
  }

  loadFormField() {

    if (this.id != null && this.data.idProducto > 0) {
      this.dataService.productos().findById(this.id).subscribe(dato => {
        this.form.patchValue(dato);
        console.log(this.form.value);

      });
    }
  }

  save() {
    const producto = (JSON.stringify(this.form.value));
    const formData = new FormData();

    formData.append('file', this.fileUpload);
    formData.append('product', producto);
    console.log(this.form.value);

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

  fuctionsDolencias() {

  }
}
