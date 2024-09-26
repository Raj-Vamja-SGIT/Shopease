import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { LoaderComponent } from '../../../common/loader/loader/loader.component';
import { BrowserModule } from '@angular/platform-browser';
import { ForgotPasswordComponent } from './forgot-password.component';



@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    RouterLink,
    LoaderComponent,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class ForgotPasswordModule { }
