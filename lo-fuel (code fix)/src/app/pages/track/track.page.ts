import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-track",
  templateUrl: "./track.page.html",
  styleUrls: ["./track.page.scss"],
})
export class TrackPage implements OnInit {
  public Centerlat:any;
  public Centerlng:any;
  origin: any = {};
  destination: any = {};
  newori: any = {};
  public renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };
  public markerOptions = {
    origin: {
      icon: "../../../assets/image/send.png",
    },
    destination: {
      icon: "../../../assets/image/gas_truck.png",
    },
    draggable: true,
  };
  public makOptions = {
    origin: {
      icon: "../../../assets/image/sender_ic.png",
    },
    destination: {
      icon: "../../../assets/image/send.png",
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
  address: any;
  constructor(private api:ApiService) {
    /* this.origin = {
      lat: 22.298922,
      lng: 70.802177,
    };
    this.destination = {
      lat: 22.269956,
      lng: 70.78884,
    };
    this.newori = {
      lat: 22.297777,
      lng: 70.802177,
    }; */
  }

  ngOnInit() {
    this.address = this.api.address;
    this.Centerlat = JSON.parse(localStorage.getItem("proLattt"));
    this.Centerlng = JSON.parse(localStorage.getItem("proLanggg"));
    this.origin = {
      lat:JSON.parse(localStorage.getItem("proLattt")),
      lng:JSON.parse(localStorage.getItem("proLangg"))
    }
    console.log(this.origin);
    
    this.destination = {
      lat:this.api.proLatTrack,
      lng:this.api.proLangTrack
    }
    console.log(this.destination);
    
  }
}
