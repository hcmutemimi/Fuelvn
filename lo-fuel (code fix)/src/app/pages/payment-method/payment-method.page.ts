import { Component, OnInit } from "@angular/core";
import { Stripe } from "@ionic-native/stripe/ngx";
import { ModalController, NavController } from "@ionic/angular";
import { ICreateOrderRequest, IPayPalConfig } from "ngx-paypal";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
import { SuccessModalPage } from "../success-modal/success-modal.page";
declare var RazorpayCheckout: any;
@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.page.html",
  styleUrls: ["./payment-method.page.scss"],
})
export class PaymentMethodPage implements OnInit {
  card = 1;
  paypal = 0;
  razors = 0;
  checkbtn: any = false;
  stripes = 0;
  public payPalConfig?: IPayPalConfig;
  data: any;
  paymentSetting: any;
  stripeData = {
    number: "",
    expMonth: 0,
    expYear: 0,
    cvc: "",
  };
  razor: any;
  public stripePublishKey: any = localStorage.getItem("stripe_key");
  constructor(
    private nav: NavController,
    private api: ApiService,
    private utl: UtilService,
    private modalController: ModalController,
    private util: UtilService,
    private stripe: Stripe
  ) {}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem("item"));

    this.api.getDataWithToken("payment/setting").subscribe(
      (success: any) => {
        if (success.success) {
          this.paymentSetting = success.data;

          localStorage.setItem("stripe_key", success.data.STRIPE_KEY);
          this.razor = success.data.RAZOR_ID;
        }
      },
      (err) => {}
    );
  }
  payment() {
    if (this.paymentSetting.offline_payment === 1) {
      this.utl.presentLoading();
      this.card = 1;
      this.paypal = 0;
      this.razors = 0;
      this.stripes = 0;
      let data = {
        payment_method: "offline",
        payment_status: "1",
        id: this.data.id,
      };
      this.api.postDataWithToken("mackPayment", data).subscribe(
        (success: any) => {
          if (success.success) {
            this.nav.navigateRoot("/home");
            this.utl.presentToast("Booking Successfully Completed");
            this.utl.dismissLoading();
            this.presentModal();
          }
        },
        (err) => {
          this.utl.dismissLoading();
        }
      );
    } else {
      this.card = 1;
      this.paypal = 0;
      this.razors = 0;
      this.stripes = 0;
      this.util.presentToast("Payment not Possible");
    }
  }

  payWithRazor() {
    var options = {
      description: "Credits towards consultation",
      image: "https://i.imgur.com/3g7nmJC.png",
      currency: this.paymentSetting.currency,
      key: this.paymentSetting.RAZOR_ID,
      amount: this.data.price * 100,
      name: "User",
      theme: {
        color: "#2C69A5",
      },
      modal: {
        ondismiss: function () {
          alert("dismissed");
        },
      },
    };

    var successCallback = (payment_id) => {
      this.util.presentLoading();
      let ok = {
        payment_token: payment_id,
        payment_method: "Razor",
        payment_status: 1,
        price: this.data.price,
        id: this.data.id,
      };
      this.api.postDataWithToken("mackPayment", ok).subscribe(
        (success: any) => {
          if (success.success) {
            this.util.presentToast("Payment Done");
            this.util.nav.navigateForward("home");
            this.util.dismissLoading();
            this.presentModal();
          }
        },
        (err) => {
          this.util.dismissLoading();
          this.util.presentToast("Something Went Wrong");
        }
      );
    };

    var cancelCallback = function (error) {
      alert(error.description + " (Error " + error.code + ")");
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  paypalPay() {
    if (this.paymentSetting.paypal_status === 1) {
      this.paypal = 1;
      this.card = 0;
      this.razors = 0;
      this.stripes = 0;
      this.initConfig(this.data.price, "User");
    } else {
      this.paypal = 1;
      this.card = 0;
      this.razors = 0;
      this.stripes = 0;
      this.util.presentToast("Payment not possible");
    }
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalPage,
      cssClass: "successModal",
    });
    return await modal.present();
  }

  private initConfig(price, name): void {
    this.payPalConfig = {
      currency: this.paymentSetting.currency,
      clientId: "sb",
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: this.paymentSetting.currency,
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: this.paymentSetting.currency,
                    value: price,
                  },
                },
              },
              items: [
                {
                  name,
                  quantity: "1",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: this.paymentSetting.currency,
                    value: price,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: "true",
      },
      style: {
        label: "paypal",
        layout: "vertical",
      },
      onApprove: (data, actions) => {
        console.log(
          "onApprove - transaction was approved, but not authorized",
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            "onApprove - you can get full order details inside onApprove: ",
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          "onClientAuthorization - you should probably inform your server about completed transaction at this point",
          data
        );
        this.util.presentLoading();
        let ok = {
          payment_token: data.id,
          payment_method: "Paypal",
          payment_status: 1,
          price: this.data.price,
          id: this.data.id,
        };
        this.api.postDataWithToken("mackPayment", ok).subscribe(
          (success: any) => {
            if (success.success) {
              this.util.presentToast("Payment Done");
              this.util.nav.navigateForward("home");
              this.util.dismissLoading();
              this.presentModal();
            }
          },
          (err) => {
            this.util.dismissLoading();
            this.util.presentToast("Something Went Wrong");
          }
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
        /* this.util.presentToast(tdata.cancel) */
      },
      onError: (err) => {},
      onClick: (data, actions) => {},
    };
  }

  paywithstripe() {
    if (this.paymentSetting.stipe_status === 1) {
      this.card = 0;
      this.paypal = 0;
      this.stripes = 1;
      this.razors = 0;
    } else {
      this.card = 0;
      this.paypal = 0;
      this.stripes = 1;
      this.razors = 0;
      this.util.presentToast("payment not possible");
    }
  }

  payWithRa() {
    if (this.paymentSetting.razor_status === 1) {
      this.card = 0;
      this.paypal = 0;
      this.stripes = 0;
      this.razors = 1;
    } else {
      this.card = 0;
      this.paypal = 0;
      this.stripes = 0;
      this.razors = 1;
      this.util.presentToast("Payment Not Possible");
    }
  }

  goPayStripe() {
    this.util.presentLoading();

    this.stripe.setPublishableKey(this.stripePublishKey);
    this.stripe
      .createCardToken(this.stripeData)
      .then((result) => {
        let ok = {
          payment_token: result.id,
          payment_method: "Stripe",
          payment_status: 1,
          price: this.data.price,
          id: this.data.id,
        };
        this.api.postDataWithToken("mackPayment", ok).subscribe(
          (success: any) => {
            if (success.success) {
              this.util.presentToast("Payment Done");
              this.util.nav.navigateForward("home");
              this.presentModal();
              this.util.dismissLoading();
            } else {
              this.util.dismissLoading();
              this.util.presentToast("Something Went Wrong");
            }
          },
          (err) => {
            this.util.dismissLoading();
            this.util.presentToast("Something Went Wrong");
          }
        );
      })
      .catch((error) => {
        this.util.presentToast(error);
        this.checkbtn = false;
        this.util.dismissLoading();
      });
  }
}
