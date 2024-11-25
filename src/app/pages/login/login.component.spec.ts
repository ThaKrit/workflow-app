import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBefor } from './login.component';

describe('LoginBefor', () => {
  let component: LoginBefor;
  let fixture: ComponentFixture<LoginBefor>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginBefor]
    });
    fixture = TestBed.createComponent(LoginBefor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
