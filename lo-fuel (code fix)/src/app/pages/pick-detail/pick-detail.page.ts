import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import { NavController } from "@ionic/angular";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from "ngx-google-places-autocomplete/objects/address";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
import { SigninPage } from "../signin/signin.page";
declare var ol: any;
@Component({
  selector: "app-pick-detail",
  templateUrl: "./pick-detail.page.html",
  styleUrls: ["./pick-detail.page.scss"],
})
export class PickDetailPage implements OnInit {
  public Centerlat = 22.298922;
  public Centerlng = 70.802177;
  public trucklat = 22.298555;
  public trucklng = 70.802177;
  redius = "10";
  lat = 22.2648;
  lang = 70.7846;
  radius = 100;
  map: any;
  public icon: any = "../../../assets/image/gas_truck.png";
  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;
  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;
  iconFeature2;
  latitude: number;
  longitude: number;
  cng = 1;
  lpg = 0;
  origin: any = {};
  destination: any = {};
  public renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };
  iconUrl = "../../../assets/image/sender_ic.png";
  Truckicon = "../../../assets/image/gas_truck.png";
  address: string;
  zoom: number;
  data: any;
  sub_fuel_type: any;
  select: any;
  provider: any;
  qty: any = 5;
  matchId: any;
  pricing: any;
  price: any;
  selectPro: any;
  priceSelect: any;
  currency: any;
  totalAmount: any = 0;
  page: any;
  addr: any;
  iconTruck = "../../../assets/image/petrol_truck.png";
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
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService,
    private nativeGeocoder: NativeGeocoder
  ) {}
  ngOnInit() {
    setTimeout(() => {
      this.newMapFunction();
    }, 500);
  }
  ionViewWillEnter() {
    this.qty = this.quantityArray[5];
    this.api.qty = this.qty.p;
    this.addr = localStorage.getItem("addressOfLast");
    this.page = this.api.select_fuel;
    setTimeout(() => {
      this.setCurrentLocation();
    }, 500);
    let data = {
      lat: JSON.parse(localStorage.getItem("curentLat")),
      lang: JSON.parse(localStorage.getItem("curentLang")),
      radius: 100,
    };
    this.util.presentLoading();
    this.api.postDataWithToken("home", data).subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.provider = success.data.provider;
          this.selectPro = success.data.provider[0].id;
          this.api.pro_id = this.selectPro;
          this.data.fuel_type.forEach((element, index) => {
            if (element.id == localStorage.getItem("pro_id")) {
              this.sub_fuel_type = this.data.fuel_type[index].sub_fuel_type;
              this.select = this.sub_fuel_type[0].name;
              this.matchId = this.sub_fuel_type[0].id;
            }
          });
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  } 

  selectQty(item) {
    if (this.pricing.length == 0) {
      this.util.presentToast("Không tìm thấy giá");
    } else {
      this.qty = item;
      this.api.qty = this.qty.p;
      this.totalAmount = JSON.parse(this.qty.p) * this.price;
      this.api.total = this.totalAmount;
    }
  }

  quantityArray: any = [
    {
      p: "1",
    },
    {
      p: "2",
    },
    {
      p: "3",
    },
    {
      p: "4",
    },
    {
      p: "5",
    },
    {
      p: "6",
    },
    {
      p: "7",
    },
    {
      p: "8",
    },
    {
      p: "9",
    },
    {
      p: "10",
    },
  ];
  match(item) {
    
    this.select = item.name;
    this.matchId = item.id;
    localStorage.setItem("matchId", item.id);
    this.api.getData("provider/" + this.selectPro + "/" + item.id).subscribe(
      (success: any) => {
        if (success.success) {
          if (success.data.price == null) {
            this.pricing = [];
            this.totalAmount = 0;
            this.api.total = this.totalAmount;
            this.util.dismissLoading();
          } else { 
            this.pricing = success.data.price.fuel_pricing;
            this.currency = success.data.price.currency;
            this.priceSelect = success.data.price.fuel_pricing[0].name;
            this.price = success.data.price.fuel_pricing[0].price;
            this.api.price = this.price;
            this.totalAmount = JSON.parse(this.qty.p) * this.price;
            this.api.total = this.totalAmount;
            localStorage.setItem("proLattt", JSON.stringify(success.data.lat));
            localStorage.setItem("proLangg", JSON.stringify(success.data.lang));
            this.util.dismissLoading();
          }
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.util.dismissLoading();
      }
    );
  }

  providerCost(e) {
    
    this.api.pro_id = e.detail.value;
    this.selectPro = e.detail.value;

    
    this.provider.forEach((element) => {
      element.fuel_type.forEach((e) => {
        if (this.api.pro_id == this.selectPro) {
          this.api
            .getData("provider/" + this.selectPro + "/" + this.matchId)
            .subscribe(
              (success: any) => {
                if (success.success) {
                  if (success.data.price == null) {
                    this.pricing = [];
                    this.totalAmount = 0;
                  } else {
                    this.pricing = success.data.price.fuel_pricing;
                    this.currency = success.data.price.currency;
                    this.priceSelect = success.data.price.fuel_pricing[0].name;
                    this.price = success.data.price.fuel_pricing[0].price;
                    this.api.price = this.price;
                    this.totalAmount = JSON.parse(this.qty.p) * this.price;
                    this.api.total = this.totalAmount;
                    localStorage.setItem("proLattt", JSON.stringify(success.data.lat));
                    localStorage.setItem("proLangg", JSON.stringify(success.data.lat));
                  }
                }
              },
              (err) => {
                this.util.dismissLoading();
              }
            );
        } else {
          this.pricing = [];
          this.totalAmount = 0;
          this.api.total = this.totalAmount;
          this.util.dismissLoading();
        }
      });
    });
  }

  myPrice(i) {
    this.priceSelect = i.name;
    this.price = i.price;
    this.api.price = this.price;
    this.totalAmount = this.price * this.qty.p;
    this.api.total = this.totalAmount;
  }

  ionViewWillLeave() {
    localStorage.removeItem("pro_id");
    localStorage.removeItem("matchId");
  }

  public handleAddressChange(address: Address) {
    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    localStorage.setItem("lat", JSON.stringify(this.latitude));
    localStorage.setItem("lang", JSON.stringify(this.longitude));
    let dataOfAddress = {
      name: address.name,
      address: address.formatted_address,
    };
    localStorage.setItem("addressOfLast", dataOfAddress.address);

    this.setMapCenterLocation(
      address.geometry.location.lng(),
      address.geometry.location.lat()
    );
  }

  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };

  getLocationCoordinates() {
    setTimeout(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getGeoencoder(this.latitude, this.longitude);

          this.zoom = 8;
          this.setMapCenterLocation(this.longitude, this.latitude);
        });
      }
    }, 500);
  }

  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder
      .reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {});
  }

  generateAddress(addressObj) {
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

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.zoom = 8;
        this.setMapCenterLocation(this.longitude, this.latitude);
      });
    }
  }
  setMapCenterLocation(long, lat) {
    var coord = this.getPointFromLongLat(long, lat);
    this.iconFeature2.getGeometry().setCoordinates(coord);
    this.map.getView().setCenter(coord);
    this.map.getView().setZoom(14);
  }
  getPointFromLongLat(long, lat) {
    return ol.proj.transform([long, lat], "EPSG:4326", "EPSG:3857");
  }
  newMapFunction() {
    this.iconFeature2 = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([this.longitude, this.latitude])
      ),
      name: "Nơi khác",
    });
    const translate1 = new ol.interaction.Translate({
      features: new ol.Collection([this.iconFeature2]),
    });
    // specific style for that one point
    this.iconFeature2.setStyle(
      new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src: this.icon,
        }),
      })
    );
    const iconLayerSource = new ol.source.Vector({
      features: [this.iconFeature2],
    });
    const iconLayer = new ol.layer.Vector({
      source: iconLayerSource,
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: "fraction",
          anchorYUnits: "pixels",
          src:
            "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
        }),
      }),
    });
    this.map = new ol.Map({
      target: "map2",
      interactions: ol.interaction.defaults({ mouseWheelZoom: false }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        iconLayer,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 8,
      }),
    });
    this.map.addInteraction(translate1);
    translate1.on("translateend", (evt) => {
      var coords = ol.proj.toLonLat(evt.coordinate);
      this.latitude = coords[1];
      this.longitude = coords[0];
    });
    setTimeout(() => {
      this.map.updateSize();
    }, 500);
  }

  markerDragEnd(event: any) {
    this.latitude = event.lat;
  }
  cartData() {
    this.nav.navigateForward("/cart");
  }
}
