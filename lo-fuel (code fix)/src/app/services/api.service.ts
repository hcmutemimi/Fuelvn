import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userToken: any;
  baseUrl:any = 'http://saasmonks.in/App-Demo/lofule-97521/public/api/user/';
  cat_id: any;
  lat:number;
  long:number;
  name: any;
  deviceToken:any;
  withoutauth:any;
  shop_id: any;
  km: any;
  mobile:any = '';
  qty:any;
  total:any;
  price:any;
  newLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public profileUpdate = new BehaviorSubject(true);
  select_fuel: any;
  date: string;
  time: string;
  pro_id: string;
  proOrderId: any;
  veId: any;
  vehicleObj: any;
  proLat: any;
  proLong: any;
  phone_no: any;
  proLatTrack: any;
  proLangTrack: any;
  changeLocation = new BehaviorSubject(false);
  locationTypeChnage = new BehaviorSubject(false)
  address: any;
  constructor(private http:HttpClient) {}

  setNewLogin(val){
    this.newLogin.next(val);
  }

  isNewLogin() {
    return this.newLogin.asObservable();
  }
   getData(url) {
    return this.http.get(this.baseUrl + url);
  }
  postData(url, data) {
    return this.http.post(this.baseUrl + url, data);
  }

  getDataWithToken(url) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + localStorage.getItem('token'));
    header = header.set("Accept", "application/json");
    return this.http.get(this.baseUrl + url, { headers: header });
  }
 
  postDataWithToken(url, data) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + localStorage.getItem('token'));
    header = header.set("Accept", "application/json");
    return this.http.post(this.baseUrl + url, data, { headers: header });
  }
}
