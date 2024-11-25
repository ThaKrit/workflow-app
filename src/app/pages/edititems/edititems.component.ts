import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/app/environments/env.config';
import { Item } from 'src/app/item/models/item';

@Component({
  selector: 'app-ux',
  templateUrl: './edititems.component.html',
  styleUrls: ['./edititems.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class EditItems implements OnInit {
  itemForm: FormGroup;
  itemId: number | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.itemForm = new FormGroup({
      status: new FormControl<string>('PENDING', { nonNullable: true }), 
      title: new FormControl<string>('', { nonNullable: true }),
      amount: new FormControl<number>(0, { nonNullable: true }),
      quantity: new FormControl<number>(0, { nonNullable: true }),
    });
  }

  ngOnInit(): void {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchItem(this.itemId);
  }

  async fetchItem(id: number) {
    try {
      const response = await axios.get<Item>(`${environment.apiUrl}/items/${id}`);
      this.itemForm.patchValue(response.data); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }

  async onSubmit() {
    if (this.itemForm.valid) {
      try {
        await axios.put(`${environment.apiUrl}/items/${this.itemId}`, this.itemForm.value);
        this.router.navigate(['/allitems']);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  }

}
