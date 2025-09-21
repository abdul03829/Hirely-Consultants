import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="delete-confirmation-dialog">
      <!-- Warning Icon -->
      <div class="warning-icon">
        <mat-icon>warning</mat-icon>
      </div>

      <!-- Content -->
      <div class="dialog-content">
        <h2 class="dialog-title">Delete Employee</h2>
        <p class="dialog-message">
          Are you sure you want to delete
          <strong
            >{{ data.employee.firstName }} {{ data.employee.lastName }}</strong
          >?
        </p>
        <p class="dialog-warning">This action cannot be undone.</p>
      </div>

      <!-- Action Buttons -->
      <div class="dialog-actions">
        <button mat-button class="cancel-btn" (click)="onCancel()">
          <mat-icon>close</mat-icon>
          Cancel
        </button>
        <button mat-flat-button class="delete-btn" (click)="onConfirm()">
          <mat-icon>delete</mat-icon>
          Delete
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .delete-confirmation-dialog {
        padding: 24px;
        text-align: center;
        max-width: 400px;
        min-width: 350px;
      }

      .warning-icon {
        margin-bottom: 20px;
      }

      .warning-icon mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
        border-radius: 50%;
        padding: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }

      .dialog-content {
        margin-bottom: 32px;
      }

      .dialog-title {
        font-size: 24px;
        font-weight: 600;
        margin: 0 0 16px 0;
        color: #333;
      }

      .dialog-message {
        font-size: 16px;
        color: #666;
        margin: 0 0 8px 0;
        line-height: 1.5;
      }

      .dialog-message strong {
        color: #333;
        font-weight: 600;
      }

      .dialog-warning {
        font-size: 14px;
        color: #ff6b6b;
        margin: 0;
        font-weight: 500;
      }

      .dialog-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
      }

      .cancel-btn {
        color: #666;
        border: 1px solid #ddd;
        min-width: 120px;
        height: 44px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .cancel-btn:hover {
        background-color: #f5f5f5;
        border-color: #ccc;
      }

      .cancel-btn mat-icon {
        margin-right: 8px;
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .delete-btn {
        background-color: #ff6b6b;
        color: white;
        min-width: 120px;
        height: 44px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s ease;
      }

      .delete-btn:hover {
        background-color: #ff5252;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
      }

      .delete-btn mat-icon {
        margin-right: 8px;
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      /* Animation */
      .delete-confirmation-dialog {
        animation: slideInUp 0.3s ease-out;
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: User }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
