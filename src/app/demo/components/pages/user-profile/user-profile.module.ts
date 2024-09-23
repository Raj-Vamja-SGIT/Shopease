import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoaderComponent } from '../../common/loader/loader/loader.component';


@NgModule({
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        FormsModule,
        DropdownModule,
        InputNumberModule,
        MultiSelectModule,
        InputTextareaModule,
        InputTextModule,
        CalendarModule,
        SelectButtonModule,
        FileUploadModule,
        ToastModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        LoaderComponent
    ],
    declarations: [UserProfileComponent],
})
export class UserProfileModule {}
