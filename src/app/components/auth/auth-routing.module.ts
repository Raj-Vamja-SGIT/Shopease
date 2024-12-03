import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'forgot-password', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordModule) },
  { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }