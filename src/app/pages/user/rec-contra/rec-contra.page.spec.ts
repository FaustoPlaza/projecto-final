import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecContraPage } from './rec-contra.page';

describe('RecContraPage', () => {
  let component: RecContraPage;
  let fixture: ComponentFixture<RecContraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecContraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
