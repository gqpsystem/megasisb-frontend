import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadListComponent } from './pages/producto/unidad-list/unidad-list.component';

const routes: Routes = [
  { path: 'unidad', component: UnidadListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
