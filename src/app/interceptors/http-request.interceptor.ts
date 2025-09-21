import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, finalize } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Start loading
    this.loadingService.startLoading();

    // Clone the request to add headers or modify it
    const modifiedRequest = this.addHeaders(request);

    // Log the outgoing request
    this.logRequest(modifiedRequest);

    const startTime = Date.now();

    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // Log successful response
          this.logResponse(event, startTime);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Log error response
        this.logError(error, startTime);

        // Handle different types of errors
        return throwError(() => this.handleError(error));
      }),
      finalize(() => {
        // Stop loading when request completes (success or error)
        this.loadingService.stopLoading();
      })
    );
  }

  /**
   * Add common headers to all requests
   */
  private addHeaders(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        // Add authentication header if token exists
        // 'Authorization': `Bearer ${this.getAuthToken()}`
      },
    });
  }

  /**
   * Log outgoing HTTP requests
   */
  private logRequest(request: HttpRequest<any>): void {
    console.group(`🚀 HTTP ${request.method} Request`);
    console.log('URL:', request.url);
    console.log(
      'Headers:',
      request.headers.keys().map((key) => ({
        [key]: request.headers.get(key),
      }))
    );
    if (request.body) {
      console.log('Body:', request.body);
    }
    console.groupEnd();
  }

  /**
   * Log successful HTTP responses
   */
  private logResponse(response: HttpResponse<any>, startTime: number): void {
    const duration = Date.now() - startTime;
    console.group(`✅ HTTP ${response.status} Response`);
    console.log('URL:', response.url);
    console.log('Status:', response.status, response.statusText);
    console.log('Duration:', `${duration}ms`);
    console.log('Data:', response.body);
    console.groupEnd();
  }

  /**
   * Log HTTP errors
   */
  private logError(error: HttpErrorResponse, startTime: number): void {
    const duration = Date.now() - startTime;
    console.group(`❌ HTTP ${error.status} Error`);
    console.log('URL:', error.url);
    console.log('Status:', error.status, error.statusText);
    console.log('Duration:', `${duration}ms`);
    console.log('Error:', error.error);
    console.log('Message:', error.message);
    console.groupEnd();
  }

  /**
   * Handle different types of HTTP errors
   */
  private handleError(error: HttpErrorResponse): HttpErrorResponse {
    let errorMessage = 'An unexpected error occurred';

    switch (error.status) {
      case 0:
        errorMessage =
          'Unable to connect to the server. Please check your internet connection.';
        break;
      case 400:
        errorMessage = 'Bad request. Please check your input data.';
        break;
      case 401:
        errorMessage = 'Unauthorized. Please log in again.';
        // You might want to redirect to login page here
        break;
      case 403:
        errorMessage =
          'Forbidden. You do not have permission to access this resource.';
        break;
      case 404:
        errorMessage = 'The requested resource was not found.';
        break;
      case 500:
        errorMessage = 'Internal server error. Please try again later.';
        break;
      case 503:
        errorMessage = 'Service unavailable. Please try again later.';
        break;
      default:
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
    }

    // Create a new error with user-friendly message
    const modifiedError = new HttpErrorResponse({
      error: {
        ...error.error,
        userMessage: errorMessage,
      },
      status: error.status,
      statusText: error.statusText,
      url: error.url || undefined,
      headers: error.headers,
    });

    return modifiedError;
  }

  /**
   * Get authentication token (implement based on your auth strategy)
   */
  private getAuthToken(): string | null {
    // Implement your token retrieval logic here
    // For example: return localStorage.getItem('authToken');
    return null;
  }
}
