import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IError } from '../core/interfaces/errors';

@Injectable()
export class ErrorIntercept implements HttpInterceptor {

  constructor(
  ) {

  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(retry(0), catchError((error: HttpErrorResponse) => {

      let errorModel: IError = {
        status: 300,
        title: "",
        message: "",
        error: null
      };
      if (error.error instanceof TimeoutError) {
        errorModel.status = 408;
        errorModel.title = `Timeout Error!`;
        errorModel.message = 'Connection request timeout';
      } if (error.error instanceof ErrorEvent) {
        errorModel.status = error.status;
        errorModel.message = error.error.message;
      } else {
        if (error.status == 0) {
          errorModel.status = error.status;
          errorModel.title = `Timeout Error!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Connection Faild! Unable to Connect to the Server!';
          }
        } else if (error.status == 400) {
          errorModel.status = error.status;
          errorModel.title = `Bad Request! `;
          if (error?.error && typeof error?.error === 'string') {
            errorModel.message = error.error;
          } else if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'required data is missing or incorrect !';
          }
        } else if (error.status == 401) {
          errorModel.status = error.status;
          errorModel.title = `Unauthorized!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'you are not authenticated user!';
          }
        } else if (error.status == 403) {
          errorModel.status = error.status;
          errorModel.title = `Forbidden!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Application try to access to properties not belong to an App!';
          }
        } else if (error.status == 404) {
          errorModel.status = error.status;
          errorModel.title = `Not Found!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Resouce not found!';
          }
        } else if (error.status == 405) {
          errorModel.status = error.status;
          errorModel.title = "Method not Allowed!";
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = `The resource doesn't support the specified HTTP verb!`;
          }
        } else if (error.status == 409) {
          errorModel.status = error.status;
          errorModel.title = `Conflict!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Some conflict occurs!';
          }
        } else if (error.status == 411) {
          errorModel.status = error.status;
          errorModel.title = `Length Required!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'The Content-Length header was not specified!';
          }
        } else if (error.status == 412) {
          errorModel.status = error.status;
          errorModel.title = `Precondition Failed!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Some Precondition Failed!';
          }
        } else if (error.status == 429) {
          errorModel.status = error.status;
          errorModel.title = `Too Many Requests!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Too many request for rate limiting!';
          }
        } else if (error.status == 500) {
          errorModel.status = error.status;
          errorModel.title = `Internal Server Error!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Servers are not working as expected. The request is probably valid but needs to be requested again later';
          }
        } else if (error.status == 503) {
          errorModel.status = error.status;
          errorModel.title = `Service Unavailable!`;
          if (error?.error?.message) {
            errorModel.message = error.error.message;
          } else {
            errorModel.message = 'Temparory Service is Unavailable!';
          }
        }
      }
      return throwError(errorModel);
    }))
  }
}