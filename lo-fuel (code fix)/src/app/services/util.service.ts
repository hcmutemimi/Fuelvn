import { Injectable } from "@angular/core";
import {
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  public isUpdateProfile = new BehaviorSubject(false);
  isLoading = false;
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    public modal: ModalController,
    public nav: NavController
  ) {}

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      mode: "ios",
    });
    toast.present();
  }
  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: "Please Wait..",
        mode: "ios",
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  dismissLoading() {
    this.isLoading = false;
    setTimeout(() => {
      return this.loadingController.dismiss();
    }, 500);
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
