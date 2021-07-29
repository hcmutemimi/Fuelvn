import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from "@angular/core";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import {
  NavController,
  MenuController,
  ModalController,
  Platform,
  AlertController,
} from "@ionic/angular";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
declare var ol: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public Centerlat = 22.298922;
  public Centerlng = 70.802177;
  map: any;
  iconFeature2;
  petrol = 1;
  diesel = 1;
  latitude: number;
  longitude: number;
  gas = 1;
  zoom: number;
  address: string;
  isshow = false;
  origin: any = {};
  destination: any = {};
  providerArray: any = [];
  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;
  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;
  public icon: any = "../../../assets/image/sender_ic.png";
  iconUrl = "../../../assets/image/sender_ic.png";
  data: any;

  constructor(
    private nav:NavController,
    private menu: MenuController,
    private util: UtilService,
    private api: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
  ) {
    setTimeout(() => { 
      this.diagnostic
      .isLocationEnabled()
      .then((isAvailable) => {
        if (isAvailable==false) {
          this.requestToSwitchOnGPS();
        }
      })
      .catch((e) => {
        alert(JSON.stringify(e));
      });
    }, 5000);
    this.locationCoords = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: "",
    };
    this.menu.enable(true);
    setTimeout(() => {
      this.getLocationCoordinates();
      this.util.dismissLoading();
    }, 3000);
  }

  requestToSwitchOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      (res) => {
        this.getLocationCoordinates()
      },
      error => alert(JSON.stringify(error))
    );
  }

  public renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };

  public styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];

  gasPump() {
    this.isshow = true;
    if (this.isshow && this.gas == 1 && this.petrol == 0 && this.diesel == 0) {
      this.nav.navigateForward("pick-detail");
    }
  }
  select: any = "";
  getData(item) {
    this.util.dismissLoading();
    this.select = item.name;
    this.api.select_fuel = this.select;
    let temp = [];
    this.providerArray.push(item, this.provider);
    this.provider.forEach((element) => {
      let isPush = false;
      item.sub_fuel_type.forEach((sbt) => {
        if (element.fuel_type.includes(sbt.id) && !isPush) {
          temp.push(element);
          isPush = true;
        }
      });
    });
    if (item.sub_fuel_type.length == 0) {
      this.util.presentToast("Không có nhiên liệu nào cả ! ");
    } else {
      localStorage.setItem("pro_id", item.id);
      this.util.dismissLoading();
      this.nav.navigateForward("pick-detail");
    }
  }

  provider: any = [];

  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        (err) => {
          //alert(err);
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              alert(
                "Lỗi khi yêu cầu cấp quyền lấy vị trí" +
                  error
              );
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          // When GPS Turned ON call method to get Accurate location coordinates
          this.getLocationCoordinates();
        },
        (error) =>
          alert(
            "Lỗi khi yêu cầu cấp quyền lấy vị trí " + JSON.stringify(error)
          )
      );
  }

  ngOnInit() {}

  get() {
    this.util.dismissLoading();
    this.getGeoencoder(this.latitude, this.longitude);
    localStorage.setItem("curentLat", JSON.stringify(this.latitude));
    localStorage.setItem("curentLang", JSON.stringify(this.longitude));
    localStorage.setItem("proLattt", JSON.stringify(this.latitude));
    localStorage.setItem("proLangg", JSON.stringify(this.longitude));
    localStorage.setItem("lat", JSON.stringify(this.latitude));
    localStorage.setItem("lang", JSON.stringify(this.longitude));
    this.api.lat = this.latitude;
    this.api.long = this.longitude;

    let data = {
      lat: this.latitude,
      lang: this.longitude,
      radius: 100,
    };
    this.util.presentLoading();
    this.api.postData("home", data).subscribe(
      (success: any) => {
        this.util.dismissLoading();
        if (success.success) {
          this.data = success.data;
          this.provider = success.data.provider;
          this.select = success.data.fuel_type[1].name;
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
    this.zoom = 8;
    this.util.dismissLoading();
  }
  ionViewWillEnter() {}

  getDatas(lat, long) {
    const fd = new FormData();
    this.util.dismissLoading();
    fd.append("lat", lat);
    fd.append("lang", long);
    fd.append("radius", "1000");
    this.api.postData("home", fd).subscribe(
      (success: any) => {
        this.util.dismissLoading();
        if (success.success) {
          this.data = success.data;
          this.provider = success.data.provider;
          this.select = success.data.fuel_type[1].name;
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  }

  public handleAddressChange(address: Address) {
    this.util.dismissLoading();
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.getGeoencoder(this.latitude, this.longitude);
    localStorage.setItem("curentLat", JSON.stringify(this.latitude));
    localStorage.setItem("curentLang", JSON.stringify(this.longitude));
    localStorage.setItem("proLattt", JSON.stringify(this.latitude));
    localStorage.setItem("proLangg", JSON.stringify(this.longitude));
    localStorage.setItem("lat", JSON.stringify(this.latitude));
    localStorage.setItem("lang", JSON.stringify(this.longitude));
    let dataOfAddress = {
      name: address.name,
      address: address.formatted_address,
    };
    localStorage.setItem("addressOfLast", dataOfAddress.address);
    localStorage.setItem("lat", JSON.stringify(this.latitude));
    localStorage.setItem("lang", JSON.stringify(this.longitude));
    this.util.dismissLoading();
  }

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  locationCoords: any;
  getLocationCoordinates() {
    this.util.presentLoading();
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.util.dismissLoading();
        this.locationCoords.latitude = resp.coords.latitude;
        this.locationCoords.longitude = resp.coords.longitude;
        this.locationCoords.accuracy = resp.coords.accuracy;
        this.locationCoords.timestamp = resp.timestamp;
        this.getGeoencoder(this.latitude, this.longitude);
        localStorage.setItem(
          "curentLat",
          JSON.stringify(this.locationCoords.latitude)
        );
        localStorage.setItem(
          "curentLang",
          JSON.stringify(this.locationCoords.longitude)
        );
        localStorage.setItem(
          "proLattt",
          JSON.stringify(this.locationCoords.latitude)
        );
        localStorage.setItem(
          "proLangg",
          JSON.stringify(this.locationCoords.longitude)
        );
        localStorage.setItem(
          "lat",
          JSON.stringify(this.locationCoords.latitude)
        );
        localStorage.setItem(
          "lang",
          JSON.stringify(this.locationCoords.longitude)
        );
        this.latitude = JSON.parse(this.locationCoords.latitude);
        this.longitude = JSON.parse(this.locationCoords.longitude);
        this.getDatas(
          this.locationCoords.latitude,
          this.locationCoords.longitude
        );
        this.api.lat = this.latitude;
        this.api.long = this.longitude;
        this.util.dismissLoading();
      })
      .catch((error) => {
        this.util.dismissLoading();
        alert("Xảy ra lỗi khi lấy vị trí" + error);
      });
  }

  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.util.dismissLoading();
        this.address = this.generateAddress(result[0]);
        localStorage.setItem("addressOfLast", this.address);
        localStorage.setItem("gene", this.address);
      })
      .catch((error: any) => {
        this.util.dismissLoading();
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    this.util.dismissLoading();
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length) address += obj[val] + ", ";
    }
    return address.slice(0, -2);
  }
  private geoCoder;
  locationData: any = {};
  getPointFromLongLat(long, lat) {
    this.util.dismissLoading();
    return ol.proj.transform([long, lat], "EPSG:4326", "EPSG:3857");
  }

  markerDragEnd(event: any) {
    this.latitude = event.lat;
    this.util.dismissLoading();
  }
}
