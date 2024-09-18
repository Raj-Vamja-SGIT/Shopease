import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: RegisterComponent }]),
    ],
    exports: [RouterModule],
})
export class RegisterRoutingModule {}
