import { Component, OnInit, Sanitizer } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DomSanitizer } from "@angular/platform-browser";
import { ActionSheetController, NavController } from "@ionic/angular";
@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit {
  data: any;
  err: any;
  img: string;
  imageUri: any;
  base64Image: any;
  name: any;
  isImgChange: boolean;
  constructor(
    private api: ApiService,
    private util: UtilService,
    private camera: Camera,
    private sanitize: DomSanitizer,
    private sheetCtrl: ActionSheetController,
    private nav: NavController
  ) {}

  ngOnInit() { 
    this.util.presentLoading();
    this.api.profileUpdate.subscribe((e) => {
      this.api.getDataWithToken("profile").subscribe(
        (success: any) => {
          if (success.success) {
            this.data = success.data;
            this.imageUri = success.data.imageUri;
            this.util.dismissLoading();
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  ionViewWillEnter() {
   // this.util.presentLoading();
    this.api.profileUpdate.subscribe((e) => {
      this.api.getDataWithToken("profile").subscribe(
        (success: any) => {
          if (success.success) {
            this.data = success.data;
            this.imageUri = success.data.imageUri;
            this.util.dismissLoading();
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     allowEdit: true,
  //     correctOrientation: true,
  //     targetHeight: 300,
  //     targetWidth: 300,
  //   };
  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //       this.img = "data:image/jpeg;base64," + imageData;
  //       this.imageUri = "data:image/jpeg;base64," + imageData;
  //       let image = imageData;
  //       this.base64Image = this.sanitize.bypassSecurityTrustResourceUrl(
  //         this.img
  //       );
  //       let myImg = {
  //         image: this.imageUri,
  //       };
  //       this.util.presentLoading();
  //       this.api.postData("api/user/profile/picture/update", myImg).subscribe(
  //         async (data: any) => {
  //           await this.util.dismissLoading();
  //           this.util.presentToast("Profile Changed!");
  //           this.api.profileUpdate.next(true);
  //         },
  //         async (err) => {
  //           await this.util.dismissLoading();
  //           this.err = err.error.errors || err.error.message;
  //           this.util.presentToast(this.err);
  //         }
  //       );
  //     },
  //     (err) => {
  //       this.err = err.error.errors || err.error.message;
  //       this.util.presentToast(this.err);
  //     }
  //   );
  // }
  // async selectImage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Image source",
  //     buttons: [
  //       {
  //         text: "Load from Library",
  //         handler: () => {
  //           this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  //         },
  //       },
  //       {
  //         text: "Use Camera",
  //         handler: () => {
  //           this.pickImage(this.camera.PictureSourceType.CAMERA);
  //         },
  //       },
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //       },
  //     ],
  //   });
  //   await actionSheet.present();
  // }

  async selectImage() {
    const actionSheet = await this.sheetCtrl.create({
      header: "Thư mục",
      mode: "ios",
      cssClass: "image-picker",
      buttons: [
        {
          text: "Thư viện",
          icon: "images-sharp",
          handler: () => {
            this.getGallery();
          },
        },
        {
          text: "Máy ảnh",
          icon: "camera-sharp",
          handler: () => {
            this.getCamera();
          },
        },
        {
          text: "Hủy",
          icon: "close",
          role: "cancel",
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }

  public getCamera(): any {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.imageUri = "data:image/jpg;base64," + file_uri;
        this.img = file_uri;
        this.isImgChange = true;
        let myImg = {
          image: this.img,
        };
        this.util.presentLoading();
        this.api.postDataWithToken("profile/picture/update", myImg).subscribe(
          async (data: any) => {
            
            await this.util.dismissLoading();
            this.util.presentToast("Cập nhật thành công!");
            this.util.presentToast(data.msg);
            this.api.profileUpdate.next(true);
          },
          async (err) => {
            await this.util.dismissLoading();
            this.err = err.error.errors || err.error.message;
            this.util.presentToast(this.err);
          }
        );
      });
  }

  public getGallery(): any {
    this.camera
      .getPicture({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true,
      })
      .then((file_uri) => {
        this.imageUri = "data:image/jpg;base64," + file_uri;
        this.img = file_uri;
        this.isImgChange = true;
        let myImg = {
          image: this.img,
        };
        this.util.presentLoading();
        this.api.postDataWithToken("profile/picture/update", myImg).subscribe(
          async (data: any) => {
            await this.util.dismissLoading();
            this.util.presentToast("Cập nhật thành công");
            this.util.presentToast(data.msg);
            this.api.profileUpdate.next(true);
          },
          async (err) => {
            await this.util.dismissLoading();
            this.err = err.error.errors || err.error.message;
            this.util.presentToast(this.err);
          }
        );
      });
  }
  
  updatePro() {
    let data = {
      name: this.name,
    };
    this.api.postDataWithToken("profile/update", data).subscribe(
      (success: any) => {
        if (success.success) {
          this.util.presentToast("Cập nhật thành công");
          this.api.profileUpdate.next(true);
        }
      },
      (err) => {
      }
    );
  }
}
