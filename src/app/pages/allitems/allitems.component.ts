import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/app/environments/env.config';
import { Item } from 'src/app/item/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './allitems.component.html',
  styleUrls: ['./allitems.component.css'],
})
export class AllItems {
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
      this.filterItems = response.data;

      if (!localStorage.getItem('hasReloaded')) {
        localStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      } else {
        localStorage.removeItem('hasReloaded');
      }
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

  async onDeleteItem(id: number) {
    const itemToDelete = this.filterItems.find((item) => item.id === id);

    if (itemToDelete) {
      const itemInfo = `
        คุณต้องการลบรายการนี้หรือไม่?
        ID: ${itemToDelete.id}
        Title: ${itemToDelete.title}
        Amount: ${itemToDelete.amount}
        Quantity: ${itemToDelete.quantity}
        Status: ${itemToDelete.status}
        Owner ID: ${itemToDelete.owner_id}
      `;
      const confirmation = confirm(itemInfo);

      if (confirmation) {
        try {
          await axios.delete(`${environment.apiUrl}/items/${id}`);
          console.log(`Item with ID: ${id} has been deleted`);
          this.filterItems = this.filterItems.filter((item) => item.id !== id);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            alert(`ไม่สามารถลบรายการได้: ${error.message}`);
          } else {
            console.error('Unexpected error:', error);
            alert('เกิดข้อผิดพลาดที่ไม่คาดคิด');
          }
        }
      }
    } else {
      alert('ไม่พบรายการที่จะลบ');
    }
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }
}
