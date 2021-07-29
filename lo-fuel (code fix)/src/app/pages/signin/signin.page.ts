import { Component, OnInit } from "@angular/core";
import { NavController, MenuController, ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {
  err: any;
  showPassword: boolean = false;
  inputData: any = {};

  constructor(
    private nav: NavController,
    private menu: MenuController,
    private api: ApiService,
    private util: UtilService,
    private modal: ModalController
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {

  }
  forgotPassword() {
    this.nav.navigateForward("/forgot");
    this.util.modal.dismiss();
  }
  signup() {
    this.nav.navigateForward("/signup");
    this.util.modal.dismiss();
  }
  signIn() {
    this.util.presentLoading();
    const fd = new FormData();
    if (this.inputData.email == undefined) {
      fd.append("email", "");
    } else {
      fd.append("email", this.inputData.email);
    }
    if (this.inputData.password == undefined) {
      fd.append("password", "");
    } else {
      fd.append("password", this.inputData.password);
    }
    fd.append(
      "device_token",
      this.api.deviceToken
        ? this.api.deviceToken
        : localStorage.getItem("pushTokn")
    );
    this.api.postData("login", fd).subscribe(
      (success: any) => {
        this.err = "";
        let hasPre = localStorage.getItem("previous-request") ? true : false;
        if (hasPre) {
          if ((success.success = true)) {
            this.util.dismissLoading();
            let page = localStorage.getItem("previous-request-page");
            localStorage.setItem("provider", "LOCAL");
            this.nav.navigateRoot(page);
            this.util.modal.dismiss();
            this.api.profileUpdate.next(true);
            this.api.setNewLogin(true);
            this.util.presentToast(success.msg);
            localStorage.setItem("token", success.data.token);
          }
        } else {
          if (success.success) {
            this.util.dismissLoading();
            this.util.modal.dismiss();
            this.api.profileUpdate.next(true);
            this.api.setNewLogin(true);
            localStorage.setItem("provider", "LOCAL");
            localStorage.setItem("token", success.data.token);
            this.nav.navigateRoot("home");
            this.util.presentToast(success.msg);
          } else {
            this.util.dismissLoading();
            this.util.modal.dismiss();
            this.util.presentToast("Đã xảy ra lỗi");
            this.util.presentToast(success.msg);
          }
        }
      },
      (err: any) => {
        this.err = err.error.errors;
        this.util.presentToast("Đã xảy ra lỗi");
        this.util.dismissLoading();
      }
    );
  }

  facebookLogin() {
    // this.fb
    //   .login(["email", "public_profile", "user_friends"])
    //   .then((res: FacebookLoginResponse) => {
    //     this.fb
    //       .api(
    //         "me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)",
    //         []
    //       )
    //       .then((profile) => {
    //         const fd = new FormData();
    //         if (profile.email) {
    //           fd.append("email", profile.email);
    //         }
    //         fd.append("provider", "FACEBOOK");
    //         fd.append("provider_token", profile.id);
    //         fd.append("name", profile.name);
    //         fd.append("image", profile.picture_large.data.url);
    //         fd.append(
    //           "device_token",
    //           this.api.deviceToken
    //             ? this.api.deviceToken
    //             : localStorage.getItem("pushTokn")
    //         );
    //         this.util.presentLoading();
    //         this.api.postDataWithToken("socialLogin", fd).subscribe(
    //           (res: any) => {
    //             if (res.success) {
    //               let page = localStorage.getItem("previous-request-page");
    //               this.util.dismissLoading();
    //               this.util.modal.dismiss();
    //               this.api.profileUpdate.next(true);
    //               this.api.setNewLogin(true);
    //               localStorage.setItem("token", res.data.token);
    //               localStorage.setItem("provider", "FACEBOOK");
    //               this.inputData = {};
    //               this.util.presentToast(res.msg);
    //               this.nav.navigateRoot(page);
    //               this.nav.navigateForward("/home");
    //             } else {
    //               this.util.presentToast(res.msg);
    //             }
    //           },
    //           (er) => {
    //             this.util.dismissLoading();
    //           }
    //         );
    //       });
    //   })
  }

  googleLogin() {
    // this.googlePlus
    //   .login({})
    //   .then((gres) => {
    //     // accessToken
    //     const fd = new FormData();
    //     fd.append("email", gres.email);
    //     fd.append("provider", "GOOGLE");
    //     fd.append("provider_token", gres.userId);
    //     fd.append("name", gres.displayName);
    //     fd.append(
    //       "device_token",
    //       this.api.deviceToken
    //         ? this.api.deviceToken
    //         : localStorage.getItem("pushTokn")
    //     );
    //     this.util.presentLoading();
    //     this.api.postData("socialLogin", fd).subscribe(
    //       (res: any) => {
    //         this.util.dismissLoading();
    //         if (res.success) {
    //           let page = localStorage.getItem("previous-request-page");
    //           this.util.dismissLoading();
    //           this.util.modal.dismiss();
    //           this.api.profileUpdate.next(true);
    //           this.api.setNewLogin(true);
    //           localStorage.setItem("token", res.data.token);
    //           localStorage.setItem("provider", "GOOGLE");
    //           this.inputData = {};
    //           this.util.presentToast(res.msg);
    //           this.nav.navigateRoot(page);
    //           this.nav.navigateForward("/home");
    //         } else {
    //         }
    //       },
    //       (er) => {
    //         this.util.dismissLoading();
    //       }
    //     );
    //   })
    //   .catch((err) => {
    //     console.error("errror", err);
    //   });
  }
}
