import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forChild([{path: '', component: UserProfileComponent}])],
    exports: [RouterModule],
})
export class UserProfileRoutingModule {}
