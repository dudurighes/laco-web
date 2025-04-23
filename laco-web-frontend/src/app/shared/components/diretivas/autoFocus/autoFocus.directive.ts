import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutoFocus implements OnInit {
  @Input()
  focusEnable: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.focusEnable) {
      this.elementRef.nativeElement.focus();
    }
  }
}
