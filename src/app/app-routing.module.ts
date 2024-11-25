import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBefor } from './pages/login/login.component';

import { AddItems } from './pages/additems/additems.component';
import { AllItems } from './pages/allitems/allitems.component';
import { ItemsApprove } from './pages/items-approve/items-approve.component';
import { EditItems } from './pages/edititems/edititems.component';
import { UserRegister } from './pages/register/register.component';

const routes: Routes = [
  { path: '', component: LoginBefor },
  { path: 'allitems', component: AllItems },
  { path: 'items/approved', component: ItemsApprove },
  { path: 'items/add', component: AddItems },
  { path: 'item/item-edit/:id', component: EditItems, },
  { path: 'register', component: UserRegister },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
