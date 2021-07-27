import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-password-otp',
  templateUrl: './password-otp.page.html',
  styleUrls: ['./password-otp.page.scss'],
})
export class PasswordOtpPage implements OnInit {

  @ViewChild("a", { static: true }) a;
  @ViewChild("b", { static: true }) b;
  @ViewChild("c", { static: true }) c;
  @ViewChild("d", { static: true }) d;
  otp: any = {};
  err: any = {};
  constructor(private nav: NavController, private menu: MenuController, private api: ApiService,private util:UtilService) {
    this.menu.enable(false);
  }
  ngOnInit() {
    setTimeout(() => {
      this.a.setFocus();
    }, 150);
  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }
  sendOtp() {
    this.otp = this.otp.a + this.otp.b + this.otp.c + this.otp.d;
    let data = {
      otp: this.otp,
      phone_no: this.api.phone_no,
      type: 0
    }
    this.util.presentLoading();
    this.api.postData('forgot/validate', data).subscribe(async (data: any) => {
      await this.util.dismissLoading();
      if (data.success) {
        localStorage.setItem('otpToken', data.data.token);
        localStorage.setItem('token',data.data.token)
      }
      this.nav.navigateForward("/change-password");
    }, err => {
      this.err = err.error.errors || err.error.message;
      this.util.presentToast(this.err);
    })
  }

}
