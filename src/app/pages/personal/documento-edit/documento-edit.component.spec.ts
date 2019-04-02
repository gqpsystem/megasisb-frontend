import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoEditComponent } from './documento-edit.component';

describe('DocumentoEditComponent', () => {
  let component: DocumentoEditComponent;
  let fixture: ComponentFixture<DocumentoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
