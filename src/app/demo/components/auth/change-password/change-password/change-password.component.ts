import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-change-password',
  styles: [
    `
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
        .txt-hover {
            color: #9aa9b3 !important;
            text-decoration: none;
        }

        .txt-hover:hover {
            color: #f96159 !important;
        }
    `,
],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  loading: boolean = false;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder,public layoutService: LayoutService) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      // Handle the password change logic here
      console.log('Password successfully changed');
    }
  }
}
