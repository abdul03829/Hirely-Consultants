import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { AddEmployeeModal } from '../add-employee-modal/add-employee-modal';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
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

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

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
    console.log('Loading users from API...');
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('Users loaded successfully:', users);
        this.dataSource.data = users;
        // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      },
      error: (error) => {
        console.error('Error loading users:', error);
      },
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
    if (
      !this.dataSource.paginator ||
      !this.dataSource.data ||
      this.dataSource.data.length === 0
    ) {
      return '0 to 0 of 0 employees';
    }

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

  openAddEmployeeModal(): void {
    const dialogRef = this.dialog.open(AddEmployeeModal, {
      width: '800px',
      maxWidth: '95vw',
      height: 'auto',
      maxHeight: '90vh',
      panelClass: 'add-employee-dialog',
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      backdropClass: 'modal-backdrop',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New employee data:', result);
        this.addNewEmployee(result);
      }
    });
  }

  private addNewEmployee(employeeData: Partial<User>): void {
    // Generate a new ID (this is temporary - in real app, backend would generate this)
    const newId = Math.max(...this.dataSource.data.map((u) => u.id), 0) + 1;

    const newEmployee: User = {
      id: newId,
      firstName: employeeData.firstName!,
      lastName: employeeData.lastName!,
      email: employeeData.email!,
      phone: employeeData.phone!,
      position: employeeData.position!,
      department: employeeData.department!,
      salary: employeeData.salary!,
      joinDate: employeeData.joinDate!,
      status: employeeData.status!,
    };

    // Add to the data source
    const currentData = this.dataSource.data;
    currentData.push(newEmployee);
    this.dataSource.data = [...currentData];

    // TODO: In a real application, you would call the API to save the employee
    // this.userService.createUser(newEmployee).subscribe(...)

    console.log('Employee added successfully:', newEmployee);
  }
}
