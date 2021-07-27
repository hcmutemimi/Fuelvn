import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"],
})
export class NotificationPage implements OnInit {
  noti: any;

  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.util.presentLoading();
    this.api.getDataWithToken("profile").subscribe(
      (success: any) => {
        if (success.success) {
          this.noti = success.data.noti;
          this.util.dismissLoading();
        }else{
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  }
  updatePro() {
    if (this.noti == 1) {
      let data = {
        noti: 0,
      };
      this.api.postDataWithToken("profile/update", data).subscribe(
        (success: any) => {
          if (success.success) {
            this.util.presentToast("Settings Updated");
            this.api.profileUpdate.next(true);
          }
        },
        (err) => {}
      );
    } else {
      let data = {
        noti: 1,
      };
      this.api.postDataWithToken("profile/update", data).subscribe(
        (success: any) => {
          if (success.success) {
            this.util.presentToast("Settings Updated");
            this.api.profileUpdate.next(true);
          }
        },
        (err) => {}
      );
    }
  }
}
