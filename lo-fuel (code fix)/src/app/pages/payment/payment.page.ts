import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SuccessModalPage } from "../success-modal/success-modal.page";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.page.html",
  styleUrls: ["./payment.page.scss"],
})
export class PaymentPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    localStorage.removeItem('addressOfLast');
    localStorage.removeItem('lat');
    localStorage.removeItem('lang');
  }
 
}
