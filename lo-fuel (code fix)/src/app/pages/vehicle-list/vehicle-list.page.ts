import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.page.html",
  styleUrls: ["./vehicle-list.page.scss"],
})
export class VehicleListPage implements OnInit {

  data: any;
  v: any = "";
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.util.presentLoading();
    this.api.getDataWithToken("vehicle").subscribe(
      (success: any) => {
        this.util.dismissLoading();
        if (success.success) {
          this.data = success.data;
          
        }
      },
      (err) => {
        this.util.dismissLoading();
        
      }
    );
  }
  isselect: any;
  selectVehicle(item) {
    this.isselect = item;
    this.v = item.id;
    this.api.veId = item.id;
    let data = {
      modelName: item.model.brand.name,
      model: item.model.name,
      number: item.reg_number,
    };
    this.api.vehicleObj = data;
    /* this.vechicleList.forEach((element) => {
      element.isselect = false;
    });
    item.isselect = true; */
  }
  cart() {
    this.nav.navigateForward("/cart");
  }
}
