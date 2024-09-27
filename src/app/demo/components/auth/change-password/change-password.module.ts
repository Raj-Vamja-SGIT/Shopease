import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ChangePasswordRoutingModule,
    ButtonModule
  ]
})
export class ChangePasswordModule { 

  
}
