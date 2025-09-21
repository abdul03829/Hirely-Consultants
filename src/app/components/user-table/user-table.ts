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
import { DeleteConfirmationDialog } from '../delete-confirmation-dialog/delete-confirmation-dialog';

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
        // Sort users by ID in descending order (newest first) to match add behavior
        const sortedUsers = users.sort((a, b) => (b.id || 0) - (a.id || 0));
        this.dataSource.data = sortedUsers;
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
    const dialogRef = this.dialog.open(AddEmployeeModal, {
      width: '800px',
      maxHeight: '90vh',
      disableClose: false,
      data: { employee: user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.userService.updateUser(result.id, result).subscribe({
          next: (updatedUser) => {
            // Update the user in the local data
            const currentData = this.dataSource.data;
            const index = currentData.findIndex(
              (u: User) => u.id === updatedUser.id
            );
            if (index !== -1) {
              currentData[index] = updatedUser;
              this.dataSource.data = [...currentData];
            }
            console.log('Employee updated successfully:', updatedUser);
          },
          error: (error) => {
            console.error('Error updating employee:', error);
          },
        });
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '400px',
      disableClose: false,
      data: { employee: user },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && user.id) {
        this.userService.deleteUser(user.id).subscribe({
          next: (success) => {
            if (success) {
              // Remove the user from the local data
              const currentData = this.dataSource.data;
              const filteredData = currentData.filter(
                (u: User) => u.id !== user.id
              );
              this.dataSource.data = filteredData;
              console.log('Employee deleted successfully:', user);
            }
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          },
        });
      }
    });
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
    // Prepare the employee data for API (without ID as backend will generate it)
    const newEmployeeData: Omit<User, 'id'> = {
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

    // Call the API to save the employee
    this.userService.addUser(newEmployeeData).subscribe({
      next: (savedEmployee: User) => {
        console.log('Employee saved successfully to API:', savedEmployee);

        // Add the saved employee (with API-generated ID) to the beginning of the data source
        const currentData = this.dataSource.data;
        this.dataSource.data = [savedEmployee, ...currentData];

        // Reset pagination to first page to show the new employee
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }

        console.log('Employee added successfully to the table');
        // TODO: Show success notification/toast
      },
      error: (error) => {
        console.error('Error saving employee to API:', error);

        // Show error notification to user
        alert('Failed to save employee. Please try again.');
      },
    });
  }
}
