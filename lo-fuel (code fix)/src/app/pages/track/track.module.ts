import { environment } from "./../../../environments/environment.prod";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TrackPageRoutingModule } from "./track-routing.module";

import { TrackPage } from "./track.page";
import { AgmCoreModule } from "@agm/core";
import { AgmDirectionModule } from "agm-direction";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.google_map_key,
    }),
    AgmDirectionModule,
    TrackPageRoutingModule,
  ],
  declarations: [TrackPage],
})
export class TrackPageModule {}
