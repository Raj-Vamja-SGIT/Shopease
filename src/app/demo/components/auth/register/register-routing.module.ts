import { RegisterComponent } from './register/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RegisterComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class RegisterRoutingModule {}
