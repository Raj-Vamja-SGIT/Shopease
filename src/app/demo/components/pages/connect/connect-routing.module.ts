import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';

const routes: Routes = [];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ConnectComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ConnectRoutingModule {}
