import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../common/loader/loader/loader.component';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ButtonModule,
        RadioButtonModule,
        DropdownModule,
        InputTextModule,
        RippleModule,
        FormsModule,
        LoaderComponent,
        DialogModule,
        BadgeModule,
        CalendarModule,
    ],
})
export class UsersModule {}
