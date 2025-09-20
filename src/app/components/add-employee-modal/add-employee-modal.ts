import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-employee-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-employee-modal.html',
  styleUrl: './add-employee-modal.scss',
})
export class AddEmployeeModal {
  employeeForm: FormGroup;

  positions = [
    'Software Engineer',
    'Senior Software Engineer',
    'Lead Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Product Manager',
    'Project Manager',
    'UI/UX Designer',
    'Data Scientist',
    'Data Analyst',
    'Quality Assurance Engineer',
    'Business Analyst',
    'Marketing Manager',
    'Sales Representative',
    'HR Manager',
    'Finance Manager',
    'Operations Manager',
    'Customer Support Representative',
  ];

  departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
    'Data & Analytics',
    'Quality Assurance',
    'DevOps',
  ];

  statuses = ['Active', 'Inactive', 'On Leave'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeModal>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)],
      ],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      joinDate: [new Date(), Validators.required],
      status: ['Active', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const newEmployee: Partial<User> = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        position: formValue.position,
        department: formValue.department,
        salary: Number(formValue.salary),
        joinDate: formValue.joinDate,
        status: formValue.status,
      };

      this.dialogRef.close(newEmployee);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.employeeForm.controls).forEach((key) => {
        this.employeeForm.get(key)?.markAsTouched();
      });
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.employeeForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }

    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }

    if (control?.hasError('minlength')) {
      return `${this.getFieldDisplayName(fieldName)} must be at least ${
        control.errors?.['minlength']?.requiredLength
      } characters`;
    }

    if (control?.hasError('pattern') && fieldName === 'phone') {
      return 'Please enter a valid phone number';
    }

    if (control?.hasError('min')) {
      return 'Salary must be greater than 0';
    }

    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      position: 'Position',
      department: 'Department',
      salary: 'Salary',
      joinDate: 'Join Date',
      status: 'Status',
    };

    return displayNames[fieldName] || fieldName;
  }
}
