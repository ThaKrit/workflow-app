import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesIconComponent } from './items-approved.component';

describe('UpdatesIconComponent', () => {
  let component: UpdatesIconComponent;
  let fixture: ComponentFixture<UpdatesIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatesIconComponent]
    });
    fixture = TestBed.createComponent(UpdatesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
