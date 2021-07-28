import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "folder/Inbox",
    pathMatch: "full",
  },
  {
    path: "folder/:id",
    loadChildren: () =>
      import("./folder/folder.module").then((m) => m.FolderPageModule),
  },
  {
    path: "signin",
    loadChildren: () =>
      import("./pages/signin/signin.module").then((m) => m.SigninPageModule),
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "forgot",
    loadChildren: () =>
      import("./pages/forgot/forgot.module").then((m) => m.ForgotPageModule),
  },
  {
    path: "verify-number",
    loadChildren: () =>
      import("./pages/verify-number/verify-number.module").then(
        (m) => m.VerifyNumberPageModule
      ),
  },
  {
    path: "otp",
    loadChildren: () =>
      import("./pages/otp/otp.module").then((m) => m.OtpPageModule),
  },
  {
    path: "onboarding",
    loadChildren: () =>
      import("./pages/onboarding/onboarding.module").then(
        (m) => m.OnboardingPageModule
      ),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "pick-detail",
    loadChildren: () =>
      import("./pages/pick-detail/pick-detail.module").then(
        (m) => m.PickDetailPageModule
      ),
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./pages/cart/cart.module").then((m) => m.CartPageModule),
  },
  {
    path: "payment-method",
    loadChildren: () =>
      import("./pages/payment-method/payment-method.module").then(
        (m) => m.PaymentMethodPageModule
      ),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./pages/payment/payment.module").then((m) => m.PaymentPageModule),
  },
  {
    path: "coupon",
    loadChildren: () =>
      import("./pages/coupon/coupon.module").then((m) => m.CouponPageModule),
  },
  {
    path: "map",
    loadChildren: () =>
      import("./pages/map/map.module").then((m) => m.MapPageModule),
  },
  {
    path: "vehicle-list",
    loadChildren: () =>
      import("./pages/vehicle-list/vehicle-list.module").then(
        (m) => m.VehicleListPageModule
      ),
  },
  {
    path: "success-modal",
    loadChildren: () =>
      import("./pages/success-modal/success-modal.module").then(
        (m) => m.SuccessModalPageModule
      ),
  },
  {
    path: "history",
    loadChildren: () =>
      import("./pages/history/history.module").then((m) => m.HistoryPageModule),
  },
  {
    path: "receipt/:id",
    loadChildren: () =>
      import("./pages/receipt/receipt.module").then((m) => m.ReceiptPageModule),
  },
  {
    path: 'track',
    loadChildren: () => import('./pages/track/track.module').then( m => m.TrackPageModule)
  },
  {
    path: 'manage-vehicle',
    loadChildren: () => import('./pages/manage-vehicle/manage-vehicle.module').then( m => m.ManageVehiclePageModule)
  },
  {
    path: 'add-vehicle',
    loadChildren: () => import('./pages/add-vehicle/add-vehicle.module').then( m => m.AddVehiclePageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'refer',
    loadChildren: () => import('./pages/refer/refer.module').then( m => m.ReferPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./pages/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'password-otp',
    loadChildren: () => import('./pages/password-otp/password-otp.module').then( m => m.PasswordOtpPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'enablelocation',
    loadChildren: () => import('./pages/enablelocation/enablelocation.module').then( m => m.EnablelocationPageModule)
  },
  {
    path: 'edit-vehicle',
    loadChildren: () => import('./pages/edit-vehicle/edit-vehicle.module').then( m => m.EditVehiclePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
