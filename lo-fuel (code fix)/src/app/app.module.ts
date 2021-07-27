import { SuccessModalPageModule } from "./pages/success-modal/success-modal.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";
import { PopoverPageModule } from "./pages/popover/popover.module";
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NgxPayPalModule } from "ngx-paypal";
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { EnablelocationPage } from "./pages/enablelocation/enablelocation.page";
import { EnablelocationPageModule } from "./pages/enablelocation/enablelocation.module";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    NgSelectModule,
    SuccessModalPageModule,
    PopoverPageModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GooglePlaceModule,
    NativeGeocoder,
    Camera,
    OneSignal,
    Geolocation,
    Stripe,
    NgxPayPalModule,
    LocationAccuracy,
    Diagnostic,
    AndroidPermissions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
