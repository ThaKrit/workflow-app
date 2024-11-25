import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItems } from './allitems.component';

describe('AllItems', () => {
  let component: AllItems;
  let fixture: ComponentFixture<AllItems>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllItems]
    });
    fixture = TestBed.createComponent(AllItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
