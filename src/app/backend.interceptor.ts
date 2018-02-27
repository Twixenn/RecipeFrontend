import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class BackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const userId = localStorage.getItem('userId');

    const newRequest = req.clone({
      headers: req.headers.set(
        'Authorization', btoa('Basic ' + userId)
      ).set(
        'Content-type', 'application/json'
      )
    });
    return next.handle(newRequest);
  }
}
