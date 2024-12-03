import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryComponent } from './sub-category/sub-category.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: SubCategoryComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SubCategoryRoutingModule {}
