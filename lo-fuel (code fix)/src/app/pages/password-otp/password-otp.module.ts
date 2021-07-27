import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordOtpPageRoutingModule } from './password-otp-routing.module';

import { PasswordOtpPage } from './password-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordOtpPageRoutingModule
  ],
  declarations: [PasswordOtpPage]
})
export class PasswordOtpPageModule {}
