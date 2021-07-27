import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.page.html",
  styleUrls: ["./change-password.page.scss"],
})
export class ChangePasswordPage implements OnInit {
  password: string = "";
  err: any = {};
  
  constructor(
    private api: ApiService,
    private nav: NavController,
    private util: UtilService
  ) {
    
    
  }
  ngOnInit() {}
  settingg() {
    let data = {
      password: this.password,
    };
    this.util.presentLoading();
    this.api.postDataWithToken("newpassword", data).subscribe(
      (data: any) => {
        this.util.dismissLoading();
        if (data.success) {
          this.util.presentToast("Your Password is Changed!");
        }
        this.nav.navigateForward("/signin");
      },
      (err) => {
        this.err = err.error.errors || err.error.message;
        this.util.presentToast(this.err);
      }
    );
  }
}
