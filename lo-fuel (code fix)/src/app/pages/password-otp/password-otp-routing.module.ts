import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordOtpPage } from './password-otp.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordOtpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordOtpPageRoutingModule {}
