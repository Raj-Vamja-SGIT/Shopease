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
import { RegisterRoutingModule } from './register-routing.module';
import { LoaderComponent } from "../../common/loader/loader/loader.component";


@NgModule({
  providers: [ToastrMessageService, MessageService],

  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    RegisterRoutingModule,
    FormsModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    LoaderComponent
]

})
export class RegisterModule { }
