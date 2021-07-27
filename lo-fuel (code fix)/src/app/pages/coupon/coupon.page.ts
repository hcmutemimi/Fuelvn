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
        "Nicolas Vargas Petrol, Diesel and Gas services is gives 25% Discount on your first delivery order.",
      expire: "31,Dec 2019",
    },
    {
      detail:
        "Harry Mendez Petrol, Diesel or Gas services is gives 50% Discount on your first delivery order.",
      expire: "31,Jan 2020",
    },
    {
      detail:
        "Marilyn Gas services is gives 50% Discount on your first delivery order.",
      expire: "15,Jan 2020",
    },
  ];
  constructor(private nav: NavController) {}

  ngOnInit() {}
  applyCoopan() {
    this.nav.navigateForward("/cart");
  }
}
