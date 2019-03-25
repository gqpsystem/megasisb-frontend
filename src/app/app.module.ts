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
import { TipodocumentoListComponent } from './pages/compra/tipodocumento-list/tipodocumento-list.component';
import { TipodocumentoEditComponent } from './pages/compra/tipodocumento-edit/tipodocumento-edit.component';
import { DolenciaEditComponent } from './pages/producto/dolencia-edit/dolencia-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UnidadListComponent,
    UnidadEditComponent,
    TipodocumentoListComponent,
    TipodocumentoEditComponent,
    DolenciaEditComponent
  ],
  entryComponents: [
    UnidadEditComponent,
    TipodocumentoEditComponent,
    DolenciaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Configuration,
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorsInterceptor, multi: true, },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
