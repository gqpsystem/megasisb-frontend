import { Params } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../data/data.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { ProductoDialogoComponent } from '../producto-dialogo/producto-dialogo.component';

@Component({
  selector: 'app-compra-edit',
  templateUrl: './compra-edit.component.html',
  styleUrls: ['./compra-edit.component.scss']
})

export class CompraEditComponent implements OnInit {

  maxDate: Date = new Date();
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  proveedores: any[] = [];
  tipocomprobantes: any[] = [];
  sucursales: any[] = [];
  filteredOptions: Observable<any[]>;
  myControlProveedor: FormControl = new FormControl();
  displayedColumns: string[] = ['codProducto', 'nombre', 'marcaProducto', 'cantidaditem', 'precioItem', 'importeTotalItem', 'acciones'];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    /*private snackBar:MatSnackBar,*/
    private formBuilder: FormBuilder) { }


  ngOnInit() {

    this.initFormBuilder();
    this.listaProveedors();

    this.listaTipoComprobante();
    this.dataService.providers().dialogo.subscribe(data => {
      let item = this.detalleCompra.value.filter((test, index, array) =>
        index === array.findIndex((findTest) =>
          findTest.producto.idProducto === data.producto.idProducto));
      if (item.length > 0) {
        this.dataService.providers().mensaje.next('El producto ya fue agreagado')
        return;
      }
      const formGroup = this.addDetalleFormControl();
      formGroup.patchValue({
        precioItem: +data.precioItem,
        cantidaditem: data.cantidaditem,
        importeTotalItem: +data.importeTotalItem.toFixed(2),
        producto: data.producto,
        productoT: data.producto
      });
    });
    /*this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 4000 });
    });*/

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.loadDataFrom();
    });
    this.filteredOptions = this.myControlProveedor.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  eliminar(index) {
    this.detalleCompra.removeAt(index);
  }

  initFormBuilder() {
    var tzoffset = (this.maxDate).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
    this.form = this.formBuilder.group({
      idCompra: [null],
      fecha: [localISOTime, Validators.compose([Validators.required])],
      montoTotal: [0, Validators.compose([Validators.required])],
      neto: [0, Validators.compose([Validators.required])],
      igv: [0, Validators.compose([Validators.required])],
      numeroComprobante: [null, Validators.compose([Validators.maxLength(20)])],
      tipocomprobante: [null, Validators.compose([Validators.required])],
      proveedor: this.myControlProveedor,
      search: [null],//temporal
      detalleCompra: this.formBuilder.array([], Validators.compose([]))
    });

    this.detalleCompra.valueChanges.subscribe(value => {
      this.calcularTotales();
    });
  }

  addDetalleFormControl(): FormGroup {
    const formGroup = this.formBuilder.group({
      idDetalleCompra: [null],
      precioItem: [0, Validators.compose([Validators.required])],
      cantidaditem: [0, Validators.compose([Validators.required])],
      importeTotal: [{ value: '', disabled: true }, Validators.compose([Validators.required])],
      importeTotalItem: [null, Validators.compose([Validators.required])],
      productoT: this.formBuilder.group({
        codigo: [{ value: '', disabled: true }],
        numProducto: [{ value: '', disabled: true }],
        marcaProducto: [{ value: '', disabled: true }]
      }),
      producto: [null, Validators.compose([Validators.required])]
    });
    this.detalleChange(formGroup);
    this.detalleCompra.push(formGroup);
    return formGroup;
  }

  detalleChange(formGroup: FormGroup) {
    formGroup.get("precioItem").valueChanges.subscribe(value => {
      const precio = value || 0;
      const cantidad = formGroup.get("cantidaditem").value || 0;
      let subTotal = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        importeTotalItem: +subTotal.toFixed(2),
        importeTotal: +subTotal.toFixed(2)
      });
    });
    formGroup.get("cantidaditem").valueChanges.subscribe(value => {
      const precio = formGroup.get("precioItem").value || 0;
      const cantidad = value || 0;
      let subTotal = parseFloat(precio) * parseFloat(cantidad);
      formGroup.patchValue({
        importeTotalItem: +subTotal.toFixed(2),
        importeTotal: +subTotal.toFixed(2)
      });
    });
  }

  calcularTotales() {
    let total = 0;
    /*let igv = 0;
    let neto = 0;*/
    this.detalleCompra.controls.forEach(formControl => {
      const precio = formControl.get("precioItem").value || 0;
      const cantidad = formControl.get("cantidaditem").value || 0;
      total = total + parseFloat(precio) * parseFloat(cantidad);
      /*const igvItem = total * 0.18;
      neto += subTotal;
      igv += igvItem;
      const totalItem = subTotal + igv;
      total += totalItem;*/

    });
    const neto = total / 1.18;
    const igv = neto * 0.18;
    this.form.patchValue({
      montoTotal: +total.toFixed(2),
      neto: +neto.toFixed(2),
      igv: +igv.toFixed(2)
    });
  }

  get detalleCompra(): FormArray {
    return this.form.get('detalleCompra') as FormArray;
  }

  filter(val: any) {
    if (val != null && val.idProveedor > 0) {
      return this.proveedores.filter(option =>
        option.razonSocial.toLowerCase().includes(val.razonSocial.toLowerCase()) || option.razonSocial.includes(val.razonSocial));
    } else {
      return this.proveedores.filter(option =>
        option.razonSocial.toLowerCase().includes(val.toLowerCase()) || option.razonSocial.includes(val)

      );

    }
  }

  private loadDataFrom() {
    if (this.edicion) {
      this.dataService.compras().findById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }
  listaProveedors() {
    this.dataService.proveedores().getAll().subscribe(data => {
      this.proveedores = data;

      console.log(data);
    });
  }

  displayFn(val: any) {

    return val ? val.razonSocial : undefined;
  }


  listaTipoComprobante() {

    this.dataService.tipoComprobantes().getAll().subscribe(data => {
      this.tipocomprobantes = data
    });
  }

  cancel() {
    
    if (this.edicion) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }

  AgregarProducto() {

    const dialogRef = this.dialog.open(ProductoDialogoComponent, { width: '900px' });
    dialogRef.afterClosed().subscribe(result => {
      //  console.log(Dialog result: ${result});
    });
  }

  save() {
    console.log(this.form.value)
    /*
    if (!this.detalleCompra.valid) return;
    if (this.edicion) {
      this.dataService.compras().update(this.form.value).subscribe(data => {
        this.dataService.compras().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se modifico')
        });
      });
    } else {
      this.dataService.compras().create(this.form.value).subscribe(data => {
        this.dataService.compras().getAll().subscribe(p => {
          this.dataService.providers().cambio.next(p);
          this.dataService.providers().mensaje.next('se registro');
        });
      });
    }
    this.cancel();
    */
  }

  buscarProducto($event) {

    if ($event.key === 'Enter') {
      /*
      this.dataService.productos().findProductoByCodProducto($event.target.value)
        .subscribe(data => {
          let detalle = {
            precioItem: +data.precioCompra.toFixed(2),
            cantidaditem: 1,
            importeTotalItem: +data.precioCompra.toFixed(2),
            importeTotal: +data.precioCompra.toFixed(2),
            producto: data,
            productoT: data
          }
          let item=this.detalleCompra.value.filter((test, index, array) =>
          index === array.findIndex((findTest) =>
          findTest.producto.idProducto === data.idProducto));
          if(item.length>0){
            this.dataService.providers().mensaje.next('El producto ya fue agreagado')
            return;
          }
          this.dataService.providers().dialogo.next(detalle);
          this.form.patchValue({ search: "" });
        },
          error => {
            this.dataService.providers().mensaje.next('Producto no encontrado')
          });
          */
    }
  }
}