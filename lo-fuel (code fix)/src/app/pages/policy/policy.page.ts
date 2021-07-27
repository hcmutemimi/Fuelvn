import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getData('privacy').subscribe((successs:any) => {
      if(successs.successs){
        console.log(successs.data);        
      }
    }, err => {
      console.log(err);      
    })
  }

}
