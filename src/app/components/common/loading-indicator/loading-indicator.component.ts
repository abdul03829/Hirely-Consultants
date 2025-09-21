import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../../services/loading.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule],
  template: `
    <div class="loading-overlay" *ngIf="isLoading">
      <div class="loading-container">
        <mat-spinner diameter="50" strokeWidth="4"></mat-spinner>
        <p class="loading-text">Loading...</p>
      </div>
    </div>

    <!-- Optional: Top progress bar -->
    <mat-progress-bar
      mode="indeterminate"
      class="top-progress-bar"
      *ngIf="isLoading"
    >
    </mat-progress-bar>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(2px);
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border: 1px solid #e0e0e0;
      }

      .loading-text {
        margin-top: 16px;
        font-size: 16px;
        color: #666;
        font-weight: 500;
      }

      .top-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10000;
        height: 4px;
      }

      /* Custom spinner colors */
      ::ng-deep .mat-mdc-progress-spinner circle {
        stroke: #6366f1;
      }

      ::ng-deep .mat-mdc-progress-bar .mdc-linear-progress__bar-inner {
        background-color: #6366f1;
      }

      /* Animation */
      .loading-overlay {
        animation: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription?: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // Add a small delay to prevent flashing for very quick requests
    this.subscription = this.loadingService.loading$
      .pipe(delay(100))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
