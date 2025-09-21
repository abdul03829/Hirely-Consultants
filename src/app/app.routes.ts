import { Routes } from '@angular/router';
import { UserTable } from './components/user-table/user-table';
import { InterceptorDemoComponent } from './components/interceptor-demo/interceptor-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UserTable },
  { path: 'demo', component: InterceptorDemoComponent },
  { path: '**', redirectTo: '/users' },
];
