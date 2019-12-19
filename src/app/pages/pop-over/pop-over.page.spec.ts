import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOverPage } from './pop-over.page';

describe('PopOverPage', () => {
  let component: PopOverPage;
  let fixture: ComponentFixture<PopOverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopOverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
