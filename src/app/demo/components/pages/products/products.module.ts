import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterLink } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';

@NgModule({
    declarations: [ProductsComponent, ProductMasterComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        DataViewModule,
        FormsModule,
        RatingModule,
        ButtonModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RouterLink,
        InputTextareaModule,
        InputGroupModule,
		InputGroupAddonModule
    ],
})
export class ProductsModule {}
