import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth/auth-layout/auth-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },
  { path: 'pagenotfound', loadChildren: () => import('./components/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule) },
  {
    path: 'auth',
    children: [
      { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  { path: '**', redirectTo: 'pagenotfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}