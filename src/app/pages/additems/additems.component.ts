import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/env.config';

@Component({
  selector: 'app-ux',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class AddItems {
  itemForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSubmit(): void {
    const formData = this.itemForm.value;

    // ตรวจสอบว่า amount และ quantity เป็นจำนวนเต็ม
    if (
      !Number.isInteger(Number(formData.amount)) ||
      !Number.isInteger(Number(formData.quantity))
    ) {
      alert('Amount และ Quantity ต้องเป็นจำนวนเต็มเท่านั้น กรุณากรอกใหม่');
      return;
    }
    if (this.itemForm.valid) {
      this.isSubmitting = true;
      this.error = null;

      formData.status = 'PENDING';
      formData.ownerId = 1;

      this.http.post(`${environment.apiUrl}/items`, formData).subscribe({
        next: (response) => {
          console.log('Item added successfully:', response);
          this.isSubmitting = false;
          this.itemForm.reset();
          alert('Add items Succress !!!');
          this.router.navigate(['allitems']);
        },
        error: (err) => {
          console.error('Error adding item:', err);
          this.error = 'Failed to add item';
          this.isSubmitting = false;
        },
      });
    } else {
      this.error = 'Form is not valid';
    }
  }
}
