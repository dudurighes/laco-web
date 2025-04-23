import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  templateUrl: './cancel-button.component.html',
  styleUrls: ['./cancel-button.component.scss'],
})
export class CancelButtonComponent implements OnInit {

  @Input() label:string = 'CANCELAR';

  @Input() icon:string = 'close';

  constructor(private location: Location) {}

  ngOnInit(): void {}
}
