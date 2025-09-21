import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CustomToastComponent,
  ToastData,
} from '../components/common/custom-toast/custom-toast.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private activeToasts: Set<any> = new Set();

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show success message
   */
  showSuccess(message: string, duration: number = 4000, icon?: string): void {
    this.showToast(
      {
        message,
        type: 'success',
        icon,
      },
      duration
    );
  }

  /**
   * Show error message
   */
  showError(message: string, duration: number = 6000, icon?: string): void {
    this.showToast(
      {
        message,
        type: 'error',
        icon,
      },
      duration
    );
  }

  /**
   * Show warning message
   */
  showWarning(message: string, duration: number = 5000, icon?: string): void {
    this.showToast(
      {
        message,
        type: 'warning',
        icon,
      },
      duration
    );
  }

  /**
   * Show info message
   */
  showInfo(message: string, duration: number = 4000, icon?: string): void {
    this.showToast(
      {
        message,
        type: 'info',
        icon,
      },
      duration
    );
  }

  /**
   * Show custom toast with modern design
   */
  private showToast(data: ToastData, duration: number): void {
    // Dismiss any existing toasts to prevent stacking/blinking
    this.activeToasts.forEach((toast) => {
      if (toast && !toast.dismissed) {
        toast.dismiss();
      }
    });
    this.activeToasts.clear();

    const toastRef = this.snackBar.openFromComponent(CustomToastComponent, {
      data,
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['modern-toast-container'],
    });

    // Track the toast reference
    this.activeToasts.add(toastRef);

    // Remove from active toasts when it's dismissed or duration expires
    toastRef.afterDismissed().subscribe(() => {
      this.activeToasts.delete(toastRef);
    });
  }

  /**
   * Employee-specific success messages
   */
  showEmployeeCreated(employeeName: string): void {
    this.showSuccess(
      `Employee "${employeeName}" has been successfully created!`,
      4000,
      'person_add'
    );
  }

  showEmployeeUpdated(employeeName: string): void {
    this.showSuccess(
      `Employee "${employeeName}" has been successfully updated!`,
      4000,
      'edit'
    );
  }

  showEmployeeDeleted(employeeName: string): void {
    this.showSuccess(
      `Employee "${employeeName}" has been successfully deleted!`,
      4000,
      'delete'
    );
  }

  /**
   * Employee-specific error messages
   */
  showEmployeeCreateError(error?: string): void {
    this.showError(
      error || 'Failed to create employee. Please try again.',
      6000,
      'error'
    );
  }

  showEmployeeUpdateError(error?: string): void {
    this.showError(
      error || 'Failed to update employee. Please try again.',
      6000,
      'error'
    );
  }

  showEmployeeDeleteError(error?: string): void {
    this.showError(
      error || 'Failed to delete employee. Please try again.',
      6000,
      'error'
    );
  }
}
