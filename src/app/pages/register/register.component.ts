import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/app/environments/env.config';

@Component({
  selector: 'app-item-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class UserRegister {
  userForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router) {
    this.userForm = new FormGroup({
      username: new FormControl<string>('', { nonNullable: true }),
      password: new FormControl<string>('', { nonNullable: true }),
      confirmPassword: new FormControl<string>('', { nonNullable: true }),
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      if (
        this.userForm.value.password !== this.userForm.value.confirmPassword
      ) {
        this.errorMessage = 'รหัสผ่านไม่ตรงกัน';
        console.error('รหัสผ่านไม่ตรงกัน');
        return;
      }

      try {
        const response = await axios.post(`${environment.apiUrl}/users`, {
          username: this.userForm.value.username,
          password: this.userForm.value.password,
        });
        console.log('User created successfully:', response.data);
        alert('Create Account Succress !!!');
        this.router.navigate(['']);
      } catch (error) {
        console.error('Error creating user:', error);
        if (axios.isAxiosError(error)) {
          this.errorMessage =
            error.response?.data?.message || 'Error!! can not cerate user ';
        } else {
          this.errorMessage = 'Error!! can not cerate user ';
        }
      }
    }
  }
}
