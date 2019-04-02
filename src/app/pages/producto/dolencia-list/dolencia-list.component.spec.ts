import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DolenciaListComponent } from './dolencia-list.component';

describe('DolenciaListComponent', () => {
  let component: DolenciaListComponent;
  let fixture: ComponentFixture<DolenciaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolenciaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
