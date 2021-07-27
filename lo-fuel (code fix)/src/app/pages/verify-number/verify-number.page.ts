import { countryCode } from "./../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-verify-number",
  templateUrl: "./verify-number.page.html",
  styleUrls: ["./verify-number.page.scss"],
})
export class VerifyNumberPage implements OnInit {
  code: any = "+91";
  number: any = 9033976854;
  cCode: any = countryCode;
  data: any = {};
  constructor(private nav: NavController) {}

  ngOnInit() {}
  clerInput() {
    this.number = "";
  }
  getotp() {
    this.nav.navigateForward("/otp");
  }
}
