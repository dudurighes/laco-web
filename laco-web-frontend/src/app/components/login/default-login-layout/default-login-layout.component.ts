import {Component, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-default-login-layout',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    NgOptimizedImage,
    MatButton,
  ],
  templateUrl: './default-login-layout.component.html',
  standalone: true,
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {

  title = input.required<string>();

  primaryBtnText = input.required<string>();

  secondaryBtnText = input.required<string>();

}
