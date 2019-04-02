import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DolenciaEditComponent } from './dolencia-edit.component';

describe('DolenciaEditComponent', () => {
  let component: DolenciaEditComponent;
  let fixture: ComponentFixture<DolenciaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolenciaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolenciaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
