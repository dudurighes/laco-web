import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SnackBarMessageService } from "src/app/shared/components/snack-bar-message/snack-bar-message.service";
import { SessionService } from "./session.service";

@Injectable(
  { providedIn: 'root' }
)
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService,
    private messageService: SnackBarMessageService,
    private router: Router,
    private route:ActivatedRoute) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.sessionService.isLoggedIn) {
      let authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + this.sessionService.authToken)
      })

      return next.handle(authRequest).pipe(tap(() => { }, (err: any) => {

        if (err instanceof HttpErrorResponse) {
          if (err.status == 403) {
            this.sessionService.logout();
            err.error == null ?  this.messageService.openSnackBarWarn("Acesso negado") : this.messageService.openSnackBarWarn(err.error.message)
            this.router.navigateByUrl("/login")
          }

          if (err.status == 401) {
            this.sessionService.logout();
            this.router.navigateByUrl("/login")
            this.messageService.openSnackBarError(err.error.message)
          }
        }

      }));
    }


    return next.handle(req);
  }

}
