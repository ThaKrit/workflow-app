import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class SharedService {
  private chkLogin: any; 

  setData(value: any) {
    this.chkLogin = value; 
  }

  getData(): any {
    return this.chkLogin; 
  }
}