import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
    AuthLayoutComponent
  ]
})
export class AuthModule { }
