import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDialogoComponent } from './producto-dialogo.component';

describe('ProductoDialogoComponent', () => {
  let component: ProductoDialogoComponent;
  let fixture: ComponentFixture<ProductoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
