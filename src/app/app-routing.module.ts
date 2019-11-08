import { DocumentoListComponent } from './pages/personal/documento-list/documento-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadListComponent } from './pages/producto/unidad-list/unidad-list.component';
import { CategoriaListComponent } from './pages/producto/categoria-list/categoria-list.component';
import { ProductoListComponent } from './pages/producto/producto-list/producto-list.component';
import { DolenciaListComponent } from './pages/producto/dolencia-list/dolencia-list.component';
import { PersonalListComponent } from './pages/personal/personal-list/personal-list.component';
import { ClienteListComponent } from './pages/personal/cliente-list/cliente-list.component';
import { ProveedorListComponent } from './pages/personal/proveedor-list/proveedor-list.component';
import { CompraListComponent } from './pages/compra/compra-list/compra-list.component';
import { CompraEditComponent } from './pages/compra/compra-edit/compra-edit.component';
import { TipoComprobanteListComponent } from './pages/compra/tipo-comprobante-list/tipo-comprobante-list.component';
import { VentaEditComponent } from './pages/compra/venta-edit/venta-edit.component';
import { ProformaEditComponent } from './pages/compra/proforma-edit/proforma-edit.component';

const routes: Routes = [
  { path: 'unidad', component: UnidadListComponent },
  { path: 'categoria', component: CategoriaListComponent },
  { path: 'producto', component: ProductoListComponent },
  { path: 'dolencia', component: DolenciaListComponent },
  { path: 'personal', component: PersonalListComponent },
  { path: 'documento', component: DocumentoListComponent },
  { path: 'cliente', component: ClienteListComponent },
  { path: 'proveedor', component: ProveedorListComponent },
  { path: 'compra', component: CompraListComponent },
  { path: 'compraN', component: CompraEditComponent },
  { path: 'tipoComprobante', component: TipoComprobanteListComponent },
  { path: 'proveedor', component: ProveedorListComponent },
  { path: 'venta', component: VentaEditComponent },
  { path: 'proforma', component: ProformaEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
