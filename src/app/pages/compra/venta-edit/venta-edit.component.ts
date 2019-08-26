import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { DataService } from 'src/app/data/data.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';


export interface columnDato {
  position: number;
  nameColumn: string;
  description: string;
  state: boolean;
}
const DATA: columnDato[] = [
  { position: 0, nameColumn: 'precioVenta', description: 'Precio de Venta', state: true },
  { position: 1, nameColumn: 'lote', description: 'Numero de Lote', state: false },
  { position: 2, nameColumn: 'producto', description: 'Nombre del producto', state: true },
  { position: 3, nameColumn: 'precioCompra', description: 'Precio de Compra', state: true },
  { position: 4, nameColumn: 'fechaVencimiento', description: 'fecha de vencimiento', state: true },
  { position: 5, nameColumn: 'area', description: 'area', state: false },
  { position: 6, nameColumn: 'categoria', description: 'categoria', state: false },
  { position: 7, nameColumn: 'codigo', description: 'codigo', state: true },
  { position: 8, nameColumn: 'recomendacion', description: 'Recomendacion', state: false },
  { position: 9, nameColumn: 'stock', description: 'Cantidad', state: true },
  { position: 10, nameColumn: 'medida', description: 'Unidad de Medida', state: false },
  { position: 11, nameColumn: 'laboratorio', description: 'laboratorio', state: false },
];

@Component({
  selector: 'app-venta-edit',
  templateUrl: './venta-edit.component.html',
  styleUrls: ['./venta-edit.component.scss']
})
export class VentaEditComponent implements OnInit {

  displayCliente = [];
  dispalyColumnTable: string[] = ['codigo', 'producto', 'cantidad', 'precio', 'monto', 'acciones'];
  ClienteControl = new FormControl();
  filtradoCliente: Observable<any[]>;
  form: FormGroup;
  displayTipoComprobante = [];
  sizediv = '0';


  //producto list
  displayColumns: string[] = ['codigo', 'producto', 'precioCompra', 'precioVenta', 'stock', 'fechaVencimiento',
    'acciones'];
  dataSource: MatTableDataSource<any>;
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchMode = 'open';
  SelectFocus: string;
  displayOption: columnDato[] = DATA;
  dolencias = [];
  tablaSinedav = '100%';
  displayDolenia = [];
  tempList = [];
  listDolenciaSelection = [];
  public bankFilterCtrl: FormControl = new FormControl();
  public filtradoDolores: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  stadoListDolencia = false;
  stadoCheckbox = true;
  ventas: FormArray;

  constructor(
    private dataService: DataService,
    private formbuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listarCliente();
    this.buildForm();
    this.listarTipoComprobante();
    this.dataService.productos().getAll().subscribe(data => {
      this.setData(data);
      this.dataSource.filterPredicate = (dato, filter: string) => {
        const dataStr = dato.codigo.toLowerCase() + dato.numProducto.toLowerCase() + dato.precioCompra + dato.precioVenta + dato.stock
          + dato.fechaVencimiento.toLowerCase() + dato.area.toLowerCase() + dato.laboratorio.toLowerCase() + dato.numLote.toLowerCase() +
          dato.dolencia.dolencia.toLowerCase() + dato.unidadMedida.codUnidadmedida.toLowerCase() + dato.recomendacion.toLowerCase()
          + dato.categoria.categoria.toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
      this.tempList = data;
    });


    this.dataService.providers().cambio.subscribe(data => { this.setData(data); console.log(data); });
    this.dataService.providers().mensaje.subscribe(data => {
      this.snackBar.open(data, 'Mensaje', { duration: 3000 });

    });
    this.listarDolencias();
  }

  addVenta(value) {

    this.ventas = this.form.controls.detalleVenta as FormArray;
    this.ventas.push(this.createItem(value));

  }

  createItem(value) {
    const cantidad = Number(document.getElementById((value.idProducto).toString()) as HTMLInputElement).value;

    return this.formbuilder.group({
      producto: value,
      cantidadVenta: cantidad,
      costoTotalVenta: cantidad * value.precioVenta,
      precioVentaUnitario : value.precioVenta ,

    });
  }

  buildForm() {
    this.form = this.formbuilder.group({
      ClienteControl: this.ClienteControl,
      fechaVenta: [null, Validators.compose([Validators.required])],
      comprobante: [null, Validators.compose([Validators.required])],
      detalleVenta: this.formbuilder.array([]),
    });
  }


  OpenProducto(value) {
    this.sizediv = value;
  }
  filtrarCliente(value) {
    if (value.persona != null) {
      const filtro = value;
      console.log(value);
      return this.displayCliente.filter(option => option.persona.nombre.toLowerCase().includes(filtro.persona.nombre.toLowerCase()));

    } else {
      const filtro = value.toLowerCase();
      console.log(value);
      return this.displayCliente.filter(option => option.persona.nombre.toLowerCase().includes(filtro));

    }
  }
  displayFn(user) {
    return user ? user.persona.nombre : undefined;
  }
  listarCliente() {
    this.dataService.clientes().getAll().subscribe(dato => {
      this.displayCliente = dato;
      this.filtradoCliente = this.ClienteControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filtrarCliente(value))
      );
      console.log(this.displayCliente);
    });

  }

  listarTipoComprobante() {
    this.dataService.tipoComprobantes().getAll().subscribe(dato => {
      this.displayTipoComprobante = dato;
    });
  }

  enviar() {
    console.log(this.form.value);
  }


  listarDolencias() {
    this.dataService.dolencias().getAll().subscribe(data => {
      const newDolencia = [];
      data.forEach(dolenci => {
        const json = {
          idDolencia: dolenci.idDolencia,
          dolencia: dolenci.dolencia,
          state: false
        };
        newDolencia.push(json);
      });
      this.dolencias = newDolencia;
    });
  }


  setData(data) {
    let r = data;
    this.cantidad = JSON.parse(JSON.stringify(data)).length;
    this.dataSource = new MatTableDataSource(r);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(data);

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  changeSeacch(mode) {
    if (this.searchMode === 'search') {
      this.searchMode = 'open';
    } else if (this.searchMode === 'view_module') {
      this.searchMode = 'open';
    } else {
      this.searchMode = mode;
    }
  }

  selectRow(event) {
    this.SelectFocus = event.idProducto;
    if (this.stadoCheckbox) {
      this.resetDolencias();
      const newDolencia = [];

      event.detalleDolencia.forEach(data => {
        const json = {
          idDolencia: data.idDolencia.idDolencia,
          dolencia: data.idDolencia.dolencia,
          state: true
        };
        newDolencia.push(json);
      });
      this.dolencias.forEach(dolenci => {
        let repite = false;
        event.detalleDolencia.forEach(data => {
          if (dolenci.dolencia === data.idDolencia.dolencia) {

            repite = true;
          }
        });
        if (!repite) {

          const json = {
            idDolencia: dolenci.idDolencia,
            dolencia: dolenci.dolencia,
            state: false
          };
          newDolencia.push(json);
        }
      });
      this.dolencias = newDolencia;
    }



  }

  selecDolencia(value) {
    if (value.state) {
      this.listDolenciaSelection.push(value.dolencia);
    } else {
      const index = this.listDolenciaSelection.indexOf(value.dolencia, 0);
      if (index > -1) {
        this.listDolenciaSelection.splice(index, 1);
      }
    }

    if (this.listDolenciaSelection.length > 0) {
      let newList = this.tempList;
      this.listDolenciaSelection.forEach(element => {
        const obj = newList.filter(o => this.searchArrayDolencia(o, element));
        newList = obj;
      });
      this.setData(newList);

    } else {
      this.setData(this.tempList);
    }

  }

  searchArrayDolencia(array, value) {
    const result = array.detalleDolencia.find(o => o.idDolencia.dolencia === value);
    return result;
  }


  resetDolencias() {
    this.dolencias.forEach(dato => {
      dato.state = false;
    });
  }

  buscarCheckbox() {
    this.setData(this.tempList);
    this.resetDolencias();
    this.listDolenciaSelection = [];
    this.stadoCheckbox = !this.stadoCheckbox;
  }

  selectColumn(event) {
    if (this.displayOption[event].state) {
      this.displayColumns.splice(this.displayColumns.length - 1, 0, this.displayOption[event].nameColumn);
    } else {
      this.displayColumns = this.displayColumns.filter(obj => obj !== this.displayOption[event].nameColumn);
    }
  }

  @HostListener('window:resize', ['$event'])
  openDolencia() {

    this.stadoListDolencia = !this.stadoListDolencia;
    if (window.innerWidth > 767) {
      if (!this.stadoListDolencia) {
        this.tablaSinedav = '100%';
      } else {
        this.tablaSinedav = '900px';
      }
    }


  }


}




