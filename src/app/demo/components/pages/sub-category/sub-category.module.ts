import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../common/loader/loader/loader.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [SubCategoryComponent],
    imports: [
        CommonModule,
        SubCategoryRoutingModule,
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
    ],
})
export class SubCategoryModule {}
