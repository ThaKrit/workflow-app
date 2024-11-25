import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import axios from 'axios';
import { environment } from 'src/app/environments/env.config';
import { Item } from 'src/app/item/models/item';

@Component({
  selector: 'app-update',
  templateUrl: './items-approve.component.html',
  styleUrls: ['./items-approve.component.css']
})
export class ItemsApprove {
  items: Item[] = [];
  filterItems: Item[] = [];
  filterInput = new FormControl<string>('', { nonNullable: true });


  constructor() {
    this.fetchItems();
  }

  async fetchItems() {
    try {
      const response = await axios.get<Item[]>(`${environment.apiUrl}/items`);
      this.items = response.data;
      this.filterItems = response.data.filter(item => item.status === 'APPROVED');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            alert(`ไม่สามารถดึงข้อมูลรายการได้: ${error.message}`);
        } else {
            console.error('Unexpected error:', error);
            alert('เกิดข้อผิดพลาดที่ไม่คาดคิด');
        }
        this.items = [];
        this.filterItems = [];
    }
}


  trackById(index: number, item: Item): number {
    return item.id;
  }
}
