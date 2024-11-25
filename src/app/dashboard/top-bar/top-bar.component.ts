import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Item } from 'src/app/item/models/item';
import { environment } from 'src/app/environments/env.config';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent implements OnInit {
  jwtToken: string | null = null;
  isLogin: boolean = false;
  isUser: string | null = null;

  items: any[] = [];
  filterItems: any[] = [];

  constructor(private dashboard: DashboardService, private router: Router) {
    this.fetchItems();
  }
  ngOnInit() {
    const authData = localStorage.getItem('authData');

    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      this.jwtToken = parsedAuthData.jwtToken;
      this.isLogin = parsedAuthData.isLogin;
      this.isUser = parsedAuthData.isUser;
    }
  }

  async fetchItems() {
    try {
      const response = await axios.get<Item[]>(`${environment.apiUrl}/users`);
      this.items = response.data;
      this.filterItems = this.items.filter(
        (user) => user.username === this.isUser
      );
    } catch (error) {
      this.items = [];
      this.filterItems = [];
    }
  }
  openSidebar() {
    this.dashboard.openSidebar();
  }
  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('authData');
    sessionStorage.setItem('hasReloaded', 'false');
  }
}
