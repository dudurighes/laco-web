import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.scss']
})
export class ConfirmButtonComponent implements OnInit {

  @Input() submitted:boolean;

  @Input() addButton:boolean = false;

  @Input() label:string = 'CADASTRAR';

  constructor() { }

  ngOnInit(): void {
  }

}
