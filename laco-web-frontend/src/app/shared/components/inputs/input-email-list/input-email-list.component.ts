import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-input-email-list',
  templateUrl: './input-email-list.component.html',
  styleUrls: ['./input-email-list.component.css']
})
export class InputEmailListComponent implements OnInit {

  selectable = true;

  removable = true;

  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  emails: string[] = [];

  @Input() parentControl: FormControl;


  ngOnInit(): void {
    this.emails = this.parentControl.value;

  }




  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (value && pattern.test(value)) {
      this.emails.push(value);
      this.parentControl.setValue(this.emails);
    }


    event.chipInput!.clear();
  }

  remove(phone: string): void {
    const index = this.emails.indexOf(phone);

    if (index >= 0) {
      this.emails.splice(index, 1);
      this.parentControl.setValue(this.emails);
    }
  }
}
