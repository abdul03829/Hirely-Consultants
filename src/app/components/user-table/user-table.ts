import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
})
export class UserTable implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'position',
    'department',
    'salary',
    'joinDate',
    'status',
    'actions',
  ];

  dataSource = new MatTableDataSource<User>();
  searchValue = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Custom filter predicate for searching across multiple fields
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const searchStr = (
        data.firstName +
        ' ' +
        data.lastName +
        ' ' +
        data.email +
        ' ' +
        data.phone +
        ' ' +
        data.position +
        ' ' +
        data.department +
        ' ' +
        data.status
      ).toLowerCase();
      return searchStr.includes(filter.toLowerCase());
    };
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Inactive':
        return 'status-inactive';
      case 'On Leave':
        return 'status-on-leave';
      default:
        return '';
    }
  }

  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  }

  getPaginationText(): string {
    if (!this.dataSource.paginator) return '';

    const startIndex =
      this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize +
      1;
    const endIndex = Math.min(
      (this.dataSource.paginator.pageIndex + 1) *
        this.dataSource.paginator.pageSize,
      this.dataSource.data.length
    );
    const total = this.dataSource.data.length;

    return `${startIndex} to ${endIndex} of ${total} employees`;
  }

  editUser(user: User): void {
    console.log('Editing user:', user);
    // TODO: Implement edit functionality
  }

  deleteUser(user: User): void {
    console.log('Deleting user:', user);
    // TODO: Implement delete functionality with confirmation
  }
}
