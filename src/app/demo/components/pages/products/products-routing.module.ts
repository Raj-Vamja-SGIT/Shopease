import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductMasterComponent } from './product-master/product-master.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ProductsComponent,
            },
            {
                path: 'master',
                component: ProductMasterComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ProductsRoutingModule {}
