import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path:"",
    redirectTo:"users/1",
    pathMatch:"full"
  },
  {
    path:"users/:userId",
    component:HomeComponent
  },
  
];
