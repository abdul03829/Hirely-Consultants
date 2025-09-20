import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@hirely.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      salary: 95000,
      joinDate: new Date('2022-03-15'),
      status: 'Active',
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@hirely.com',
      phone: '+1 (555) 234-5678',
      position: 'Product Manager',
      department: 'Product',
      salary: 105000,
      joinDate: new Date('2021-08-20'),
      status: 'Active',
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@hirely.com',
      phone: '+1 (555) 345-6789',
      position: 'UX Designer',
      department: 'Design',
      salary: 78000,
      joinDate: new Date('2023-01-10'),
      status: 'Active',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@hirely.com',
      phone: '+1 (555) 456-7890',
      position: 'Data Analyst',
      department: 'Analytics',
      salary: 72000,
      joinDate: new Date('2022-11-05'),
      status: 'On Leave',
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@hirely.com',
      phone: '+1 (555) 567-8901',
      position: 'DevOps Engineer',
      department: 'Engineering',
      salary: 88000,
      joinDate: new Date('2021-06-12'),
      status: 'Active',
    },
    {
      id: 6,
      firstName: 'Lisa',
      lastName: 'Brown',
      email: 'lisa.brown@hirely.com',
      phone: '+1 (555) 678-9012',
      position: 'HR Manager',
      department: 'Human Resources',
      salary: 82000,
      joinDate: new Date('2020-09-30'),
      status: 'Active',
    },
    {
      id: 7,
      firstName: 'Robert',
      lastName: 'Taylor',
      email: 'robert.taylor@hirely.com',
      phone: '+1 (555) 789-0123',
      position: 'Marketing Specialist',
      department: 'Marketing',
      salary: 65000,
      joinDate: new Date('2023-04-18'),
      status: 'Active',
    },
    {
      id: 8,
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'jennifer.martinez@hirely.com',
      phone: '+1 (555) 890-1234',
      position: 'QA Engineer',
      department: 'Engineering',
      salary: 75000,
      joinDate: new Date('2022-07-22'),
      status: 'Inactive',
    },
    {
      id: 9,
      firstName: 'James',
      lastName: 'Anderson',
      email: 'james.anderson@hirely.com',
      phone: '+1 (555) 901-2345',
      position: 'Finance Analyst',
      department: 'Finance',
      salary: 70000,
      joinDate: new Date('2021-12-03'),
      status: 'Active',
    },
    {
      id: 10,
      firstName: 'Amanda',
      lastName: 'Garcia',
      email: 'amanda.garcia@hirely.com',
      phone: '+1 (555) 012-3456',
      position: 'Sales Representative',
      department: 'Sales',
      salary: 68000,
      joinDate: new Date('2023-02-14'),
      status: 'Active',
    },
    {
      id: 11,
      firstName: 'Christopher',
      lastName: 'Thompson',
      email: 'christopher.thompson@hirely.com',
      phone: '+1 (555) 123-4567',
      position: 'Backend Developer',
      department: 'Engineering',
      salary: 92000,
      joinDate: new Date('2022-05-08'),
      status: 'Active',
    },
    {
      id: 12,
      firstName: 'Michelle',
      lastName: 'White',
      email: 'michelle.white@hirely.com',
      phone: '+1 (555) 234-5678',
      position: 'Content Writer',
      department: 'Marketing',
      salary: 58000,
      joinDate: new Date('2023-06-25'),
      status: 'On Leave',
    },
  ];

  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find((user) => user.id === id));
  }

  addUser(user: User): Observable<User> {
    const newUser = {
      ...user,
      id: Math.max(...this.users.map((u) => u.id)) + 1,
    };
    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(id: number, user: Partial<User>): Observable<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user };
      return of(this.users[index]);
    }
    return of(null);
  }

  deleteUser(id: number): Observable<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
