import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItems } from './additems.component';

describe('AddItems', () => {
  let component: AddItems;
  let fixture: ComponentFixture<AddItems>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddItems]
    });
    fixture = TestBed.createComponent(AddItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
