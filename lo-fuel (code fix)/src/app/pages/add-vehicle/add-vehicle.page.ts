import { Component, OnInit } from "@angular/core";
import { ActionSheetController, NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilService } from "src/app/services/util.service";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-add-vehicle",
  templateUrl: "./add-vehicle.page.html",
  styleUrls: ["./add-vehicle.page.scss"],
})
export class AddVehiclePage implements OnInit {
  data: any;
  err: any;
  model: any;
  model_id: any = "";
  color: any = "";
  reg_number: any = "";
  note: any = "";
  imageUri: any;
  models: any = "";
  model_id2: any = "";
  img: string;
  base64Image: any;
  image: any;
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private sanitize: DomSanitizer
  ) {} 
  dataOfFirst: any;
  modelFirst: any;
  ngOnInit() {
    this.util.presentLoading();
    this.api.getData("vehicleBrand").subscribe(
      (data: any) => {
        if (data.success) {
          this.data = data.data;
          console.log(this.data);
          
          this.util.dismissLoading();
        }
      },
      (err) => {
        this.err = err.error.errors || err.error.message;
        this.util.presentToast(this.err);
        this.util.dismissLoading();
      }
    );
  }
  changeModel(ev) {
    this.model_id2 = ev.detail.value;
    this.api.getData("vehicleModel/" + this.model_id2).subscribe(
      (data: any) => {
        if (data.success) {
          this.model = data.data;
        }
      },
      (err) => {
        this.err = err.error.errors || err.error.message;
        this.util.presentToast(this.err);
      }
    );
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true,
      targetHeight: 300,
      targetWidth: 300,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.img = "data:image/jpeg;base64," + imageData;
        this.imageUri = imageData;
        this.base64Image = this.sanitize.bypassSecurityTrustResourceUrl(
          this.img
        );
        this.image = this.imageUri;
        this.image = this.img;
      },
      (err) => {
        this.err = err.error.errors || err.error.message;
        this.util.presentToast(this.err);
      }
    );  
  } 
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  manageVechicle() {
    if (this.imageUri == null || this.imageUri == "") {
      this.util.presentToast("please add image");
    } else {
      let data = {
        model_id: this.model_id,
        color: this.color,
        reg_number: this.reg_number,
        model: this.models,
        note: this.note,
        image: this.imageUri,
      };
      this.api.postDataWithToken("vehicle", data).subscribe(
        (success: any) => {
          if (success.success) {
            this.util.presentToast("Vehicle Added SuccessFully");
            this.nav.navigateForward("manage-vehicle");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    
  }
}
