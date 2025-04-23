import { ViewEncapsulation } from '@angular/compiler';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snack-bar',
  templateUrl: './success-snack-bar.component.html',
  styleUrls: ['./success-snack-bar.component.scss'],

})
export class SuccessSnackBarComponent implements OnInit {

  message: string;

  constructor(
    public snackRef: MatSnackBarRef<SuccessSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data;
  }

  ngOnInit(): void {
  }

  dismiss() {
    this.snackRef.dismiss();
  }
}
