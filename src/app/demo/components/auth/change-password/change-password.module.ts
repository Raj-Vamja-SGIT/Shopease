import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordModule } from 'primeng/password';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    PasswordModule,

  ]
})
export class ChangePasswordModule { 

  
}
