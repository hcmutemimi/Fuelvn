import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.page.html",
  styleUrls: ["./otp.page.scss"],
})
export class OtpPage implements OnInit {
  @ViewChild("a", { static: true }) a;
  @ViewChild("b", { static: true }) b;
  @ViewChild("c", { static: true }) c;
  @ViewChild("d", { static: true }) d;
  otp: any = {};
  constructor(private nav: NavController, private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {
    setTimeout(() => {
      this.a.setFocus();
    }, 150);
  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }
  goToHome() {
    this.nav.navigateForward("/onboarding");
  }
}
