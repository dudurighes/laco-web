import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatIconButton,
    MatInput,
  ]
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() icon: string = '';
  @Input() model: any;
  @Input() name: string = '';
}
