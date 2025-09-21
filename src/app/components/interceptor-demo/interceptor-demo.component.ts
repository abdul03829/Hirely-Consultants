import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-interceptor-demo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <div class="demo-container">
      <mat-card class="demo-card">
        <mat-card-header>
          <mat-card-title>HTTP Interceptor Demo</mat-card-title>
          <mat-card-subtitle
            >Test the interceptor functionality</mat-card-subtitle
          >
        </mat-card-header>

        <mat-card-content>
          <p>Click the buttons below to test different interceptor features:</p>

          <div class="demo-buttons">
            <button
              mat-raised-button
              color="primary"
              (click)="testSuccessRequest()"
            >
              Test Success Request
            </button>

            <button mat-raised-button color="warn" (click)="testErrorRequest()">
              Test Error Request
            </button>

            <button
              mat-raised-button
              color="accent"
              (click)="testLoadingState()"
            >
              Test Loading State
            </button>

            <button mat-raised-button (click)="showNotifications()">
              Test Notifications
            </button>
          </div>

          <div class="loading-status">
            <p>
              <strong>Current Loading State:</strong>
              {{ isLoading ? 'Loading...' : 'Not Loading' }}
            </p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
      }

      .demo-card {
        margin: 20px 0;
      }

      .demo-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 20px 0;
      }

      .demo-buttons button {
        width: 100%;
      }

      .loading-status {
        margin-top: 20px;
        padding: 12px;
        background-color: #f5f5f5;
        border-radius: 8px;
        text-align: center;
      }
    `,
  ],
})
export class InterceptorDemoComponent {
  isLoading = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {
    // Subscribe to loading state
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  testSuccessRequest(): void {
    console.log('🧪 Testing Success Request');
    this.userService.getUsers().subscribe({
      next: (users) => {
        console.log('✅ Success:', users);
        this.notificationService.showSuccess(
          `Loaded ${users.length} users successfully!`
        );
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.notificationService.showError('Failed to load users');
      },
    });
  }

  testErrorRequest(): void {
    console.log('🧪 Testing Error Request');
    // Try to get a non-existent user
    this.userService.getUserById(99999).subscribe({
      next: (user) => {
        console.log('✅ Unexpected success:', user);
      },
      error: (error) => {
        console.error('❌ Expected error:', error);
        const userMessage =
          error.error?.userMessage || 'Unknown error occurred';
        this.notificationService.showError(userMessage);
      },
    });
  }

  testLoadingState(): void {
    console.log('🧪 Testing Loading State');
    this.notificationService.showInfo(
      'Loading state test - watch the spinner!'
    );

    // Make multiple requests to test loading state management
    this.userService.getUsers().subscribe();
    setTimeout(() => {
      this.userService.getUsers().subscribe();
    }, 500);
  }

  showNotifications(): void {
    console.log('🧪 Testing Notifications');
    this.notificationService.showSuccess('This is a success message!');

    setTimeout(() => {
      this.notificationService.showWarning('This is a warning message!');
    }, 1000);

    setTimeout(() => {
      this.notificationService.showInfo('This is an info message!');
    }, 2000);

    setTimeout(() => {
      this.notificationService.showError('This is an error message!');
    }, 3000);
  }
}
