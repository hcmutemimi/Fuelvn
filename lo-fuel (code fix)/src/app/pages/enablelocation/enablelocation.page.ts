import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-enablelocation',
  templateUrl: './enablelocation.page.html',
  styleUrls: ['./enablelocation.page.scss'],
})
export class EnablelocationPage implements OnInit {

  constructor(private nav:ModalController) { }

  ngOnInit() {
  }
  close(){
      this.nav.dismiss();
  }

}
