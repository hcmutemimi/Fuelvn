import { Component, OnInit } from "@angular/core";
import { NavController, MenuController } from "@ionic/angular";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.scss"],
})
export class OnboardingPage implements OnInit {
  constructor(private nav: NavController, private menu: MenuController) {
    this.menu.enable(false);
  }

  ngOnInit() {}
  home() {
    this.nav.navigateRoot("/home");
  }
}
