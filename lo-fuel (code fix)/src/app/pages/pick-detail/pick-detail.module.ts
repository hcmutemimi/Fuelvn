import { environment } from "./../../../environments/environment.prod";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PickDetailPageRoutingModule } from "./pick-detail-routing.module";

import { PickDetailPage } from "./pick-detail.page";
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
    PickDetailPageRoutingModule,
    GooglePlaceModule
  ],
  declarations: [PickDetailPage],
})
export class PickDetailPageModule {}
