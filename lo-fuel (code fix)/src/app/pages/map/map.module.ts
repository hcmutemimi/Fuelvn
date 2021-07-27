import { environment } from "./../../../environments/environment.prod";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { MapPageRoutingModule } from "./map-routing.module";

import { MapPage } from "./map.page";
import { AgmCoreModule } from "@agm/core";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_map_key,
    }),
    MapPageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [MapPage],
})
export class MapPageModule {}
