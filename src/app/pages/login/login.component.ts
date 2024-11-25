import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/app/environments/env.config';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginBefor {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      try {
        const response = await axios.post(
          `${environment.apiUrl}/auth/login`,
          this.loginForm.value,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const token = response.data.access_token;
        const isLog = 1;
        const authData = {
          jwtToken: token,
          isLogin: true,
          isUser: username,
        };

        if (isLog === 1) {
          localStorage.setItem('authData', JSON.stringify(authData));
          this.errorMessage = null;

          this.router.navigate(['/allitems']);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        if (axios.isAxiosError(error) && error.response) {
          this.errorMessage = error.response.data?.message || 'Erorr!! login';
        } else {
          this.errorMessage = 'Erorr!! login';
        }
      }
    }
  }
}
