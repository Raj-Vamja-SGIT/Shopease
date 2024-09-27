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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoaderComponent } from '../../common/loader/loader/loader.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';



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
    FormsModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
