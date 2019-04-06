import { Injectable } from '@angular/core';
import { UnidadService } from './unidad.service';
import { ProviderService } from '../provider/provider.service';
import { PresentacionService } from './presentacion.service';
import { DolenciaService } from './dolencia.service';
import { CategoriaService } from './categoria.service';
import { ProductoService } from './producto.service';
import { PersonaService } from './persona.service';
import { PersonalService } from './personal.service';
import { DocumentoService } from './documento.service';
import { ClienteService } from './cliente.service';
import { ProveedorService } from './proveedor.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private provider: ProviderService,
    private unidad: UnidadService,
    private presentacion: PresentacionService,
    private dolencia: DolenciaService,
    private categoria: CategoriaService,
    private producto: ProductoService,
    private persona: PersonaService,
    private personal: PersonalService,
    private documento: DocumentoService,
    private cliente: ClienteService,
    private proveedor: ProveedorService
  ) { }

  providers(): ProviderService {
    return this.provider;
  }

  unidadMedidas(): UnidadService {
    return this.unidad;
  }

  presentaciones(): PresentacionService {
    return this.presentacion;
  }

  dolencias(): DolenciaService {
    return this.dolencia;
  }

  categorias(): CategoriaService {
    return this.categoria;
  }

  productos(): ProductoService {
    return this.producto;
  }

  personas(): PersonaService {
    return this.persona;
  }

  personales(): PersonalService {
    return this.personal;
  }

  documentos(): DocumentoService {
    return this.documento;
  }

  clientes(): ClienteService {
    return this.cliente;
  }

  proveedores(): ProveedorService {
    return this.proveedor;
  }
}
