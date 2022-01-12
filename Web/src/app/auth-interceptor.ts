import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialogService } from './components/dialog/dialog.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  headers: HttpHeaders;
  count = 0;
  constructor(
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const newReq = this.setHeaders(req);

    return next.handle(newReq).pipe(
      tap(
        (event: HttpEvent<any>) => {

        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            return this.handleRequest(err);
          }
        }
      )
    );
  }
  setHeaders(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': environment.siteUrl,
      }
    });
  }

  setHeader(request: HttpRequest<any>, key: string, value: string) {
    request.headers.set(key, value);
  }

  handleRequest(error: HttpErrorResponse) {
    return error;
  }
}
