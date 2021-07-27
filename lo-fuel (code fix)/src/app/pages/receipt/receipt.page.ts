import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.page.html",
  styleUrls: ["./receipt.page.scss"],
})
export class ReceiptPage implements OnInit {
  rate = 3;
  status: any;
  data: any;
  provider_id: any;
  comment: any;
  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.status = params["id"];
      this.provider_id = params["id"];
    });
    this.util.presentLoading();
    this.api.getDataWithToken("booking/" + this.status).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  }
  history() {
    this.util.presentLoading();
    let data = {
      provider_id: this.api.proOrderId,
      booking_id: this.status,
      star: this.rate,
      cmt: this.comment,
    };
    this.api.postDataWithToken("review", data).subscribe(
      (success: any) => {
        if (success.success) {
          this.nav.navigateForward("/history");
          this.util.presentToast("Thanks for review");
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  }
  setRatingValue(e) {
    this.rate = e;
  }
  trackOrder() {
    this.api.proLatTrack = this.data.lat;
    this.api.proLangTrack = this.data.lang;
    this.api.address = this.data.address;
    this.nav.navigateForward("/track");
  }

  paymentDone() {
    this.util.nav.navigateForward("/payment-method");
    localStorage.setItem("item", JSON.stringify(this.data));
  }
  paymentCancel() {
    this.util.presentLoading();
    let data = {
      status: 4,
    };
    this.api
      .postDataWithToken("booking/" + this.data.id + "/update", data)
      .subscribe(
        (success: any) => {
          if (success.success) {
            this.util.presentToast("Canceled");
            this.ngOnInit();
            this.util.dismissLoading();
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
  }
}
