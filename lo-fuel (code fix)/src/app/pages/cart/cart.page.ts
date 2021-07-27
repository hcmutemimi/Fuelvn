import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.page.html",
  styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
  price = 8;
  public Centerlat: any;
  public Centerlng: any;
  origin: any = {};
  destination: any = {};
  public renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };
  public markerOptions = {
    origin: {
      icon: "../../../assets/image/sender_ic.png",
    },
    destination: {
      icon: "../../../assets/image/gas_truck.png",
    },
    draggable: true,
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
  date: string | number | Date;
  time: string | number | Date;
  vehicleInfo: any;
  vehicleId: any;
  addr: any = "";
  // distance: any;
  dates: any = "";
  times: any = "";
  total: any = 0;
  prices: any = 0;
  qty: any = 0;
  page: any = "";
  proLattt: any;
  proLangg: any;
  distance: string;
  // distance: number;
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService,
  ) {
    this.proLattt = JSON.parse(localStorage.getItem("proLattt"));
    this.proLangg = JSON.parse(localStorage.getItem("proLangg")); 
  }
  async ngOnInit() {
    console.log("this.api.long",this.api.long);
    console.log("this.api.lat",this.api.lat);
    console.log("this.api.proLat",this.proLattt);
    console.log("this.api.proLong",this.proLangg);
    
    this.util.getDistanceFromLatLonInKm(
      this.api.lat,
      this.api.long,
      this.proLattt,
      this.proLangg
    );
    this.distance = this.util
      .getDistanceFromLatLonInKm(
        this.api.lat,
        this.api.long,
        this.proLattt,
        this.proLangg
      )
     .toFixed(1);
    console.log("this.distance", this.distance);

    this.Centerlat = JSON.parse(localStorage.getItem("lat"));
    this.Centerlng = JSON.parse(localStorage.getItem("lang"));
    console.log("this.Centerlat", this.Centerlat);
    console.log("this.Centerlng", this.Centerlng);

    this.origin = { lat: this.api.lat, lng: this.api.long };
    this.destination = { lat: this.proLattt, lng: this.proLangg };
    this.addr = localStorage.getItem("addressOfLast");
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "cart");
      this.util.nav.navigateForward("signin");
    }
    this.total = this.api.total;
    this.prices = this.api.price;
    this.qty = this.api.qty;
    this.page = this.api.select_fuel;
    this.vehicleInfo = this.api.vehicleObj;
    this.vehicleId = this.api.veId;
  }
  async ionViewWillEnter() {
   this.util.getDistanceFromLatLonInKm(
      this.api.lat,
     this.api.long,
      // this.api.proLat,
        // this.api.proLong,
      this.proLattt,
      this.proLangg
    );
    this.distance = this.util
      .getDistanceFromLatLonInKm(
        this.api.lat,
        this.api.long,
        // this.api.proLat,
        // this.api.proLong,
        this.proLattt,
        this.proLangg
      )
       .toFixed(1);
    // console.log("this.distance", this.distance);

    this.Centerlat = JSON.parse(localStorage.getItem("lat"));
    this.Centerlng = JSON.parse(localStorage.getItem("lang"));
    // console.log("this.Centerlat", this.Centerlat);
    // console.log("this.Centerlng", this.Centerlng);

    this.origin = { lat: this.proLattt, lng: this.proLangg };
    this.destination = { lat: this.proLattt, lng: this.proLangg };
    // this.destination = { lat: this.api.proLat, lng: this.api.proLong };
    this.addr = localStorage.getItem("addressOfLast");
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "cart");
      this.util.nav.navigateForward("signin");
    }
    this.total = this.api.total;
    this.prices = this.api.price;
    this.qty = this.api.qty;
    this.page = this.api.select_fuel;
    this.vehicleInfo = this.api.vehicleObj;
    this.vehicleId = this.api.veId;
  }
  remove() {
    if (this.qty != 1) {
      this.qty--;
      this.total = this.prices * this.qty;
    }
  }
  add() {
    this.qty++;

    this.total = this.qty * this.prices;
  }
  paymentMethod() {
    if (this.addr == null) {
      this.util.presentToast("Select Your Address");
    } else if (this.times == "") {
      this.util.presentToast("Select Time");
    } else if (this.dates == "") {
      this.util.presentToast("Select Dates");
    } else if (this.vehicleInfo == null) {
      this.util.presentToast("Select Your Vehicle");
    } else {
      let data = {
        provider_id: this.api.pro_id,
        vehicle_id: this.api.veId,
        fuel_type: this.page,
        price: this.total,
        discount: "0",
        time: this.api.time,
        address: localStorage.getItem("addressOfLast"),
        qty: this.qty,
        payment_status: "0",
        payment_method: "Offline",
        lat: localStorage.getItem("lat"),
        lang: localStorage.getItem("lang"),
      };
      localStorage.setItem("bookingData", JSON.stringify(data));
      this.util.presentLoading();
      this.api
        .postDataWithToken(
          "booking",
          JSON.parse(localStorage.getItem("bookingData"))
        )
        .subscribe(
          (success: any) => {
            if (success.success) {
              this.nav.navigateRoot("/home");
              this.util.presentToast("Booking Successfully Completed");
              this.util.dismissLoading();

              this.api.vehicleObj = {};
            }
          },
          (err) => {
            this.util.dismissLoading();
          }
        );
    }
  }
  changeAddress() {
    this.nav.navigateForward("/map");
  }
  changeVehicle() {
    this.nav.navigateForward("/vehicle-list");
  }
  applyCoupan() {
    this.nav.navigateForward("/coupon");
  }
  mydate(e) {
    let d = new Date(this.date);
    let obj = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.api.date = obj;
    this.dates = obj;
  }
  mytime(e) {
    let d = new Date(this.time);
    let objj = d.toTimeString().substring(0, d.toTimeString().indexOf("GMT"));
    this.api.time = this.api.date + " " + objj;
    this.times = objj;
  }
}
