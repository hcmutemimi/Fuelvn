import { Component, OnInit } from "@angular/core";
import { PopoverController, NavController } from "@ionic/angular";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.page.html",
  styleUrls: ["./popover.page.scss"],
})
export class PopoverPage implements OnInit {
  constructor(private pop: PopoverController, private nav: NavController) {}

  ngOnInit() {}
  editVehicle() {
    this.pop.dismiss();
    this.nav.navigateForward("/edit-vehicle");
  }
  remove() {
    this.pop.dismiss();
  }
}

// this.vehicle_id = this.selected_vehicle.id;
// console.log("this.selected_vehicle", this.selected_vehicle);
    

// this.api.postDataWithToken("vehicle/" + {this.vehicle_id} "/update").subscribe(
//   (success: any) => {
//     if (success.success) {
//       this.util.presentToast("Vehicle Added SuccessFully");
//       this.nav.navigateForward("manage-vehicle");
//     }
//   },
//   (err) => {
//     console.log(err);
//   }
// );
