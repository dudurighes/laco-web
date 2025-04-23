import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageSnack } from './message';
import { SnackBarMessageService } from './snack-bar-message.service';

@Component({
  selector: 'ava-snack-bar-message',
  templateUrl: './snack-bar-message.component.html',
})
export class SnackBarMessageComponent implements OnInit {

  constructor(private snackBarMessageService: SnackBarMessageService, private _snackBar: MatSnackBar) {

    this.snackBarMessageService
      .getMessage()
      .subscribe(message => {
        if (!message) {
          return;
        }
        this._snackBar.open(message.message, "OK", {
          duration: message.duration * 1000,
          panelClass: message.messageClass,
        });
      })

  }

  ngOnInit() {
  }

}
