import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaEditComponent } from './proforma-edit.component';

describe('ProformaEditComponent', () => {
  let component: ProformaEditComponent;
  let fixture: ComponentFixture<ProformaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProformaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProformaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
