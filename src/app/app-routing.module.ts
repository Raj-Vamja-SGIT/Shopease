import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ForgotPasswordComponent } from './demo/components/auth/forgotpassword/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './demo/components/auth/change-password/change-password/change-password.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    // component: AppLayoutComponent,
                    component: LoginComponent,
                    children: [
                        // {
                        //     path: 'home',
                        //     loadChildren: () =>
                        //         import(
                        //             './demo/components/dashboard/dashboard.module'
                        //         ).then((m) => m.DashboardModule),
                        // },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },

                {
                    path: 'shopease',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'pages',
                            loadChildren: () =>
                                import(
                                    './demo/components/pages/pages.module'
                                ).then((m) => m.PagesModule),
                        },
                    ],
                },
                {
                    path: 'forgot-password',
                    component:ForgotPasswordComponent
                },
                {
                    path: 'changepassword',
                    component:ChangePasswordComponent
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
