import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalServiceService } from '../local-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare let window: any;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  encodedData = '';
  QRSCANNED_DATA: string;
  isOn = false;
  scannedData: {};
  resp
  mycord = { 
    lat: '27.6433991',
    lng: '79.9344179'
  };
  mycity;
  aqi
  airQualityIndexType;
  mycolorcombo = {}
  constructor(
    public toastController: ToastController,
    private localservice: LocalServiceService,
    private geolocation: Geolocation,


  ) {
    this.getCurrentLocation()
    this.trackByMyLocation()
    //this.toggle();
  }

  ionViewDidLoad() {
    this.getCurrentLocation()
    this.trackByMyLocation()
  }
  toggle() {

    this.localservice.requestViaGet(this.localservice.fetchURLKeyword() + 'Delhi').subscribe((res: any) => {
      this.resp = res.data;

      console.log(this.resp.data)
    })

  }

  trackByMyLocation() {
    this.localservice.presentLoading('a');
    this.getCurrentLocation()
    setTimeout(() => {
      if (this.mycord) {
        this.localservice.requestViaGet('https://api.waqi.info/feed/geo:' + this.mycord.lat + ';' + this.mycord.lng + '/?token=a691947dea235f0505fffd3ef7d5567845df9689').subscribe((res: any) => {
          this.mycity = res.data.city
          this.aqi = res.data.aqi
          this.airQualityIndexType = this.localservice.AirQualityCheck(res.data.aqi)
          this.localservice.loading.dismiss();
        })
      } else {
        this.getCurrentLocation()

      }
    }, 500)


  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp: any) => {
      this.mycord = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }

      console.log(this.mycord);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



}
