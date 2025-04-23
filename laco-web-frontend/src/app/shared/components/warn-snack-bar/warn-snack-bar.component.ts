import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warn-snack-bar',
  templateUrl: './warn-snack-bar.component.html',
  styleUrls: ['./warn-snack-bar.component.scss']
})
export class WarnSnackBarComponent implements OnInit {

  message: string;

  constructor(
    public snackRef: MatSnackBarRef<WarnSnackBarComponent>,
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
