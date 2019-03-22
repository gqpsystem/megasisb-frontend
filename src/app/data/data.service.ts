import { Injectable } from '@angular/core';
import { UnidadService } from './unidad.service';
import { ProviderService } from '../provider/provider.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private provider: ProviderService,
    private unidad:UnidadService
  ) { }

  providers(): ProviderService {
    return this.provider;
  }
  
  unidadMedidas():UnidadService{
    return this.unidad;
  }
}
