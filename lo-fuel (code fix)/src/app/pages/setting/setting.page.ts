import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"],
})
export class SettingPage implements OnInit {
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit() {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "setting");
      this.util.nav.navigateForward("signin");
    }
    this.api.getData("privacy").subscribe(
      (successs: any) => {
        if (successs.successs) {
          console.log(successs.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  account() {
    this.nav.navigateForward("/account");
  }
  changeLocation() {
    this.nav.navigateForward("/location");
  }
  notification() {
    this.nav.navigateForward("/notification");
  }
  policy() {
    this.nav.navigateForward("/policy");
  }
  support() {
    this.nav.navigateForward("/help");
  }
}
