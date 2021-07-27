import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-location",
  templateUrl: "./location.page.html",
  styleUrls: ["./location.page.scss"],
})
export class LocationPage implements OnInit {
  provider: string;
  constructor(
    private nav: NavController,
    private util: UtilService,
    private api: ApiService
  ) {
    this.provider = localStorage.getItem("provider");
    console.log("this.provider",this.provider);
  }
  current: any = "";
  new: any = "";
  confirm: any = "";
  ngOnInit() {}
  setting() {
    this.nav.navigateForward("/setting");
  }
  err: any;
  changePass() {
    this.util.presentLoading();
    let data = {
      old_password: this.current,
      password: this.new,
      password_confirmation: this.confirm,
    };
    this.api.postDataWithToken("profile/password/update", data).subscribe(
      (success: any) => {
        if (success.success) {
          this.util.dismissLoading();
          this.util.presentToast("Password Change Successfully");
          this.current = "";
          this.new = "";
          this.confirm = "";
          this.nav.navigateForward("setting");
        } else {
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.err = err.error.errors;
        this.util.dismissLoading();
      }
    );
  }

  changePassmsg() {
    this.util.presentToast("password cannot be changed");
  }
}
