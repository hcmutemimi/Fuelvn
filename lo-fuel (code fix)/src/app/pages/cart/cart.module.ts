import { environment } from "./../../../environments/environment.prod";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CartPageRoutingModule } from "./cart-routing.module";

import { CartPage } from "./cart.page";
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
    CartPageRoutingModule,
  ],
  declarations: [CartPage],
})
export class CartPageModule {}
