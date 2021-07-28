import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-coupon",
  templateUrl: "./coupon.page.html",
  styleUrls: ["./coupon.page.scss"],
})
export class CouponPage implements OnInit {
  offer = [
    {
      detail:
        "Dịch vụ Nicolas Vargas Petrol, Diesel và Gas sẽ giảm 25% cho lần đặt hàng đầu tiên",
      expire: "31 tháng 12 2019",
    },
    {
      detail:
        "Dịch vụ Harry Mendez Petrol, Diesel và Gas sẽ giảm 50% cho lần đặt hàng đầu tiên.",
      expire: "31 tháng 6 2020",
    },
    {
      detail:
        "Dịch vụ Marilyn Gas sẽ giảm 50% cho lần đặt hàng đầu tiên.",
      expire: "15 tháng 6 2020",
    },
  ];
  constructor(private nav: NavController) {}

  ngOnInit() {}
  applyCoopan() {
    this.nav.navigateForward("/cart");
  }
}
