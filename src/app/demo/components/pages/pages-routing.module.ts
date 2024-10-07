import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user',
                loadChildren: () =>
                    import('./user-profile/user-profile.module').then(
                        (m) => m.UserProfileModule
                    ),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./users/users.module').then((m) => m.UsersModule),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
