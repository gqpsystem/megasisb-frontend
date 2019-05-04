import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComprobanteEditComponent } from './tipo-comprobante-edit.component';

describe('TipoComprobanteEditComponent', () => {
  let component: TipoComprobanteEditComponent;
  let fixture: ComponentFixture<TipoComprobanteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComprobanteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComprobanteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
