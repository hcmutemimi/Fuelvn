import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"],
})
export class HistoryPage implements OnInit {
  currentOrder = [
    {
      img: "../../../assets/image/palmer.png",
      name: "Bruce Stanley",
      status: "Pending",
      orno: "#3654",
      add: "Stane Farm, Stane St, London, UK.",
      date: "12,Dec 2019",
      time: "10:30 am to 01:00 pm",
      price: "$20.00",
      car: "Audi A8",
      carno: "WB 007",
    },
  ];
  pastOrder = [
    {
      img: "../../../assets/image/louic.png",
      name: "Louisa Wade",
      status: "Complete",
      orno: "#6659",
      add: "Stane Farm, Stane St,London, UK.",
      date: "10,Dec 2019",
      time: "11:00 am to 02:00 pm",
      price: "$20.00",
      car: "Audi A7",
      carno: "WB 007",
    },
  ];
  dateWise = [
    {
      img: "../../../assets/image/louic.png",
      name: "Elizabeth Gray",
      status: "Complete",
      orno: "#6659",
      add: "Stane Farm, Stane St,London, UK.",
      date: "10,Dec 2019",
      time: "11:00 am to 02:00 pm",
      price: "$20.00",
      car: "Audi A7",
      carno: "WB 007",
    },
  ];
  booking: any;
  booking2: any;
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit() {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "history");
      this.util.nav.navigateForward("signin");
    } else {
      this.api.profileUpdate.subscribe((e) => {
        this.util.presentLoading();
        this.api.getDataWithToken("booking").subscribe(
          (success: any) => {
            if (success.success) {
              this.booking = success.data.future;
              this.booking2 = success.data.past;
              console.log(success);

              this.util.dismissLoading();
            }
          },
          (err) => {
            this.util.dismissLoading();
          }
        );
      });
    }
  }
  ionViewWillEnter() {
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "history");
      this.util.nav.navigateForward("signin");
    } else {
      this.api.profileUpdate.subscribe((e) => {
        this.util.presentLoading();
        this.api.getDataWithToken("booking").subscribe(
          (success: any) => {
            if (success.success) {
              this.booking = success.data.future;
              this.booking2 = success.data.past;
              console.log(success.success);

              this.util.dismissLoading();
            }
          },
          (err) => {
            this.util.dismissLoading();
          }
        );
      });
    }
  }
  Receipt(status, provider_id) {
    this.nav.navigateForward("/receipt/" + status);
    this.api.proOrderId = provider_id;
  }
}
