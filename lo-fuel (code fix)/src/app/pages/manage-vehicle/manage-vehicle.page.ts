import { PopoverPage } from "./../popover/popover.page";
import { Component, OnInit } from "@angular/core";
import { NavController, PopoverController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-manage-vehicle",
  templateUrl: "./manage-vehicle.page.html",
  styleUrls: ["./manage-vehicle.page.scss"],
})
export class ManageVehiclePage implements OnInit {
  constructor(
    private nav: NavController,
    private popoverController: PopoverController,
    private api:ApiService,
    private util:UtilService
  ) {}

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  if (token == "") {
    localStorage.setItem("previous-request", "true");
    localStorage.setItem("previous-request-page", "manage-vehicle");
    this.util.nav.navigateForward("signin");
  } else{
    this.api.profileUpdate.subscribe((d) => {
      this.util.presentLoading();
      this.api.getDataWithToken('vehicle').subscribe((success:any) => {
        console.log(success.data);
        this.vehicle = success.data;
        console.log(this.vehicle);
        
        this.util.dismissLoading();
      }, err => {
        console.log(err);      
        this.util.dismissLoading();
      })
    })
  }

  }
  vehicle = [];
  addVehicle() {
    this.nav.navigateForward("/add-vehicle");
  }
  async presentPopover(ev: any,item) {
    // console.log(item);
    localStorage.setItem("selected_vehicle",JSON.stringify(item));
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true,
      cssClass: "prescription",
    });
    return await popover.present();
  }
}
