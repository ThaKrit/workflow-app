import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegister } from './register.component';

describe('UserRegister', () => {
  let component: UserRegister;
  let fixture: ComponentFixture<UserRegister>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegister]
    });
    fixture = TestBed.createComponent(UserRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
