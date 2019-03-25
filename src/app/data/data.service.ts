import { Injectable } from '@angular/core';
import { UnidadService } from './unidad.service';
import { ProviderService } from '../provider/provider.service';
import { TipodocumentoService } from './tipodocumento.service';
import { DolenciaService } from './dolencia.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private provider: ProviderService,
    private unidad: UnidadService,
    private tipoDocumento: TipodocumentoService,
    private dolencia: DolenciaService
    ) { }

  providers(): ProviderService {
    return this.provider;
  }

  unidadMedidas(): UnidadService {
    return this.unidad;
  }

  tipoDocumentos(): TipodocumentoService {
    return this.tipoDocumento;
  }

  dolencias(): DolenciaService {
    return this.dolencia ;
  }
}
