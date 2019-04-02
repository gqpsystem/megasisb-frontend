import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UnidadListComponent } from './pages/producto/unidad-list/unidad-list.component';
import { UnidadEditComponent } from './pages/producto/unidad-edit/unidad-edit.component';
import { Configuration } from './config/mega.config';
import { ServerErrorsInterceptor } from './config/server-errors.interceptor';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PresentacionListComponent } from './pages/producto/presentacion-list/presentacion-list.component';
import { PresentacionEditComponent } from './pages/producto/presentacion-edit/presentacion-edit.component';
import { CategoriaEditComponent } from './pages/producto/categoria-edit/categoria-edit.component';
import { CategoriaListComponent } from './pages/producto/categoria-list/categoria-list.component';
import { ProductoEditComponent } from './pages/producto/producto-edit/producto-edit.component';
import { ProductoListComponent } from './pages/producto/producto-list/producto-list.component';
import { DolenciaEditComponent } from './pages/producto/dolencia-edit/dolencia-edit.component';
import { DolenciaListComponent } from './pages/producto/dolencia-list/dolencia-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PersonalListComponent } from './pages/personal/personal-list/personal-list.component';
import { PersonalEditComponent } from './pages/personal/personal-edit/personal-edit.component';
import { DocumentoListComponent } from './pages/personal/documento-list/documento-list.component';
import { ClienteListComponent } from './pages/personal/cliente-list/cliente-list.component';
import { DocumentoEditComponent } from './pages/personal/documento-edit/documento-edit.component';
import { ClienteEditComponent } from './pages/personal/cliente-edit/cliente-edit.component';
import { ProveedorListComponent } from './pages/personal/proveedor-list/proveedor-list.component';
import { ProveedorEditComponent } from './pages/personal/proveedor-edit/proveedor-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UnidadListComponent,
    UnidadEditComponent,
    PresentacionListComponent,
    PresentacionEditComponent,
    CategoriaEditComponent,
    CategoriaListComponent,
    ProductoEditComponent,
    ProductoListComponent,
    DolenciaEditComponent,
    DolenciaListComponent,
    PersonalListComponent,
    PersonalEditComponent,
    DocumentoListComponent,
    ClienteListComponent,
    DocumentoEditComponent,
    ClienteEditComponent,
    ProveedorListComponent,
    ProveedorEditComponent
  ],
  entryComponents: [
    UnidadEditComponent,
    PresentacionEditComponent,
    CategoriaEditComponent,
    ProductoEditComponent,
    DolenciaEditComponent,
    PersonalEditComponent,
    DocumentoEditComponent,
    ClienteEditComponent,
    ProveedorEditComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    Configuration,
    {provide: HTTP_INTERCEPTORS,useClass: ServerErrorsInterceptor,multi: true,},
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
