import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComprobanteListComponent } from './tipo-comprobante-list.component';

describe('TipoComprobanteListComponent', () => {
  let component: TipoComprobanteListComponent;
  let fixture: ComponentFixture<TipoComprobanteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobanteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobanteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
