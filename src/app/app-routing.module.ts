import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadListComponent } from './pages/producto/unidad-list/unidad-list.component';
import { TipodocumentoListComponent } from './pages/compra/tipodocumento-list/tipodocumento-list.component';

const routes: Routes = [
  { path: 'unidad', component: UnidadListComponent },
  { path: 'tipoDocumento', component: TipodocumentoListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
