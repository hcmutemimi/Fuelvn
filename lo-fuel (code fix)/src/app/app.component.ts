import { Component, OnInit } from "@angular/core";

import {
  Platform,
  MenuController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { IonRouterOutlet } from "@ionic/angular";
import { QueryList, ViewChildren } from "@angular/core";
import { ApiService } from "./services/api.service";
import { UtilService } from "./services/util.service";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "../assets/image_icon/home_ic.svg",
    },
    {
      title: "History",
      url: "/history",
      icon: "../assets/image_icon/pump.svg",
    },
    {
      title: "Manage Vehicles",
      url: "/manage-vehicle",
      icon: "../assets/image_icon/vehicle_ic.svg",
    },
    {
      title: "Setting",
      url: "/setting",
      icon: "../assets/image_icon/settings.svg",
    },
  ];
  profile: any;
  token: string;
  locationCoords: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private nav: NavController,
    private toastController: ToastController,
    private router: Router,
    private api: ApiService,
    private util: UtilService,
    private oneSignal: OneSignal,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy
  ) {
    this.initializeApp();
    this.backButtonEvent();
    this.nav.navigateRoot("/home");
    this.api.isNewLogin().subscribe((d) => {
      setTimeout(() => {
        this.token = localStorage.getItem("token")
          ? localStorage.getItem("token")
          : "";
        if (d) {
          this.api.getDataWithToken("profile").subscribe(
            (success: any) => {
              if (success.success) {
                this.profile = success.data;
              }
            },
            (error) => {}
          );
        }
      }, 500);
    });
    this.api.profileUpdate.subscribe((e) => {
      this.api.getDataWithToken("profile").subscribe(
        (success: any) => {
          if (success.success) {
            this.profile = success.data;
          }
        },
        (error) => {}
      );
    });
    
  }

  getLocationCoordinates() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;
      })
      .catch((error) => {
        alert("Error getting location" + error);
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#21e4c0");
      this.splashScreen.hide();
    });
    setTimeout(() => {
      this.api.getData("noti/setting").subscribe(
        (res: any) => {
          // console.log("key", res);
          if (res.success) {
            // console.log("res", res);
            if (res.data.APP_ID && res.data.PROJECT_NUMBER) {
              this.oneSignal.startInit(
                res.data.APP_ID,
                res.data.PROJECT_NUMBER
              );
              this.oneSignal
                .getIds()
                .then((ids) => (this.api.deviceToken = ids.userId));
              // console.log(
              //   "one signal",
              //   this.oneSignal
              //     .getIds()
              //     .then((ids) => (this.api.deviceToken = ids.userId))
              // );
              this.oneSignal.endInit();
            } else {
              this.api.deviceToken = null;
            }
          }
        },
        (err) => {}
      );
    }, 2000);
  }

  profileGo() {
    this.nav.navigateForward("account");
    this.menu.close();
  }
  ngOnInit() {
    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
  closeMenu() {
    this.menu.close();
  }
  signOut() {
    this.menu.close();
    this.nav.navigateRoot("/signin");
    localStorage.clear();
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/home" ||
          this.router.url === "/signin"
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator["app"].exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }
  async showToast() {
    const toast = await this.toastController.create({
      message: "press back again to exit App.",
      duration: 2000,
    });
    toast.present();
  }
}
