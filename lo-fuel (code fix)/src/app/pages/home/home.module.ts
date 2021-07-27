import { environment } from "./../../../environments/environment.prod";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";

import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_map_key,
    }),
    AgmDirectionModule,
    HomePageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
