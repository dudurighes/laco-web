import { ErrorSnackBarComponent } from './../error-snack-bar/error-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { MessageSnack } from "./message";
import { SuccessSnackBarComponent } from '../success-snack-bar/success-snack-bar.component';
import { WarnSnackBarComponent } from '../warn-snack-bar/warn-snack-bar.component';


@Injectable({ providedIn: 'root' })
export class SnackBarMessageService {

    duration = 6;
    keepAfterRouteChange = false;


    messageSubject: Subject<MessageSnack> = new Subject<MessageSnack>();

    constructor(
      private _snackBar: MatSnackBar,
      router: Router) {

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                }
            }
        });
    }

    openSnackBarSuccess(msg: string, keepAfterRouteChange: boolean = false) {

      this._snackBar.openFromComponent(SuccessSnackBarComponent,
        {
          data: msg,
          duration:6000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
          panelClass:"success"
        }
        );

    }

    openSnackBarWarn(msg: string, keepAfterRouteChange: boolean = false) {

      this._snackBar.openFromComponent(WarnSnackBarComponent,
        {
          data: msg,
          duration:600000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
          panelClass:"warn"
        }
        );

    }

    openSnackBarError(msg: string, keepAfterRouteChange: boolean = false) {
      this._snackBar.openFromComponent(ErrorSnackBarComponent,
        {
          data: msg,
          duration:6000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
          panelClass:"error"
        }
        );
    }


    private message(messageClass: string, message: string, keepAfterRouteChange: boolean) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.messageSubject.next(new MessageSnack(messageClass, message, this.duration))
    }


    getMessage() {
        return this.messageSubject.asObservable();
    }

}
