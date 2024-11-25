import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsApprove } from './items-approve.component';

describe('ItemsApprove', () => {
  let component: ItemsApprove;
  let fixture: ComponentFixture<ItemsApprove>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsApprove]
    });
    fixture = TestBed.createComponent(ItemsApprove);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
