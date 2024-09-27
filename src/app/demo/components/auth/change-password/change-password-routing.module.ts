import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ChangePasswordComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ChangePasswordRoutingModule {}
