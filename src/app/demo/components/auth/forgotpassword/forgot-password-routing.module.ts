import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ForgotPasswordComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
