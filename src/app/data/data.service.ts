import { Injectable } from '@angular/core';
import { UnidadService } from './unidad.service';
import { ProviderService } from '../provider/provider.service';
import { DolenciaService } from './dolencia.service';
import { CategoriaService } from './categoria.service';
import { ProductoService } from './producto.service';
import { PersonaService } from './persona.service';
import { PersonalService } from './personal.service';
import { DocumentoService } from './documento.service';
import { ClienteService } from './cliente.service';
import { ProveedorService } from './proveedor.service';
import { CompraService } from './compra.service';
import { TipoComprobanteService } from './tipo-comprobante.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private provider: ProviderService,
    private unidad: UnidadService,
    private dolencia: DolenciaService,
    private categoria: CategoriaService,
    private producto: ProductoService,
    private persona: PersonaService,
    private personal: PersonalService,
    private documento: DocumentoService,
    private cliente: ClienteService,
    private proveedor: ProveedorService,
    private compra: CompraService,
    private comprobante: TipoComprobanteService
  ) { }

  providers(): ProviderService {
    return this.provider;
  }

  unidadMedidas(): UnidadService {
    return this.unidad;
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

  compras(): CompraService {
    return this.compra;
  }

  tipoComprobantes(): TipoComprobanteService {
    return this.comprobante;
  }
}
