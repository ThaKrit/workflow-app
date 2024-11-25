import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isLogin: boolean = false;

  ngOnInit() {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      this.isLogin = parsedAuthData.isLogin;
    }
  }

  
  @Input() mobileOrientation: 'start' | 'end';
  styles: {
    start: string;
    end: string;
  };
  constructor(private dashboard: DashboardService) {

    this.mobileOrientation = 'end';
    this.styles = {
      start: 'left-0',
      end: 'right-0',
    };
  }

  sidebarOpen() {
    return this.dashboard.sidebarOpen;
  }
}
