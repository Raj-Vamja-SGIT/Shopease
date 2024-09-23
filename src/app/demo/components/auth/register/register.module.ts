import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register/register.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastrMessageService } from 'src/app/demo/service/toastr.service';


@NgModule({
  providers: [ToastrMessageService, MessageService],

  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    
    FormsModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    ToastModule,
  ]

})
export class RegisterModule { }
