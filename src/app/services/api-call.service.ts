import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}

  private baseRoute = 'https://209.145.48.167:44397/api/';
  private mockApiBaseUrl = 'http://localhost:3000';

  postCall(
    payload: any,
    apiRoute: string,
    isAuth: boolean = false
  ): Observable<any> {
    const headers = this.createHeaders(isAuth);
    const finalRoute = this.baseRoute + apiRoute;

    return this.http
      .post<any>(finalRoute, payload, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  getCall(apiRoute: string, isAuth: boolean = false): Observable<any> {
    const headers = this.createHeaders(isAuth);
    const finalRoute = this.baseRoute + apiRoute;

    return this.http
      .get<any>(finalRoute, { headers })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // User API methods for mock server
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.mockApiBaseUrl}/users`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  getUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.mockApiBaseUrl}/users/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.mockApiBaseUrl}/users`, user)
      .pipe(catchError(this.handleError.bind(this)));
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.mockApiBaseUrl}/users/${id}`, user)
      .pipe(catchError(this.handleError.bind(this)));
  }

  deleteUser(id: number): Observable<any> {
    return this.http
      .delete(`${this.mockApiBaseUrl}/users/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private createHeaders(isAuth: boolean): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (isAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        throw new Error('Authentication token not found');
      }
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
      console.error('Client-side error:', error.error);
    } else {
      console.error(
        `Server Error - Status: ${error.status}, Message: ${error.message}`
      );

      switch (error.status) {
        case 400:
          errorMessage =
            error.error?.message || 'Bad Request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please login again.';
          localStorage.removeItem('token');
          break;
        case 403:
          errorMessage =
            'Forbidden. You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 409:
          errorMessage =
            error.error?.message || 'Conflict. Resource already exists.';
          break;
        case 422:
          errorMessage =
            error.error?.message ||
            'Validation failed. Please check your input.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        case 503:
          errorMessage =
            'Service temporarily unavailable. Please try again later.';
          break;
        default:
          errorMessage = `Server Error: ${error.status} - ${error.statusText}`;
      }
    }

    return throwError(() => errorMessage);
  }
}
