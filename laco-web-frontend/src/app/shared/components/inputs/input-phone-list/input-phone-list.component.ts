import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-input-phone-list',
  templateUrl: './input-phone-list.component.html',
  styleUrls: ['./input-phone-list.component.css']
})
export class InputPhoneListComponent implements OnInit {

  selectable = true;

  removable = true;

  addOnBlur = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  @Input() phones: string[] = [];

  @Input() parentControl: FormControl;

  @Input() required = true;


  ngOnInit(): void {
    this.phones = this.parentControl.value;
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && value.length >= 13) {
      this.phones.push(value);
      this.parentControl.setValue(this.phones);
    }

    event.chipInput!.clear();
  }

  remove(phone: string): void {
    const index = this.phones.indexOf(phone);

    if (index >= 0) {
      this.phones.splice(index, 1);
      this.parentControl.setValue(this.phones);
    }
  }

}
