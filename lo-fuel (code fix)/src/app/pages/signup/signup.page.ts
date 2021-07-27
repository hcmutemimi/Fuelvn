import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";
import { ViewChild } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  @ViewChild("input", { static: true }) myInput;
  name: any = "";
  email: any = "";
  password: any = "";
  confirmPass: any = "";
  err: any;
  showPassword: boolean = false;
  constructor(
    private nav: NavController,
    private menu: MenuController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {}
  signIn() {
    this.util.presentLoading();
    let data = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone_no: this.confirmPass,
    };
    this.api.postData("register", data).subscribe(
      (success: any) => {
        if (success.success) {
          localStorage.setItem("token", success.data.token);
          this.api.profileUpdate.next(true);
          this.nav.navigateRoot("home");
          this.util.dismissLoading();
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

  login(){
    this.nav.navigateForward('signin');
  }
}
