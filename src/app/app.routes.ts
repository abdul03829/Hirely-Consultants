import { Routes } from '@angular/router';
import { UserTable } from './components/user-table/user-table';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserTable },
  { path: '**', redirectTo: '/users' },
];
