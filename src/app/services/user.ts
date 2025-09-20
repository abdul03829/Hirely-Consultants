import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiCallService: ApiCallService) {}

  getUsers(): Observable<User[]> {
    return this.apiCallService.getUsers();
  }

  getUserById(id: number): Observable<User> {
    return this.apiCallService.getUserById(id);
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.apiCallService.addUser(user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.apiCallService.updateUser(id, user);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.apiCallService.deleteUser(id);
  }
}
