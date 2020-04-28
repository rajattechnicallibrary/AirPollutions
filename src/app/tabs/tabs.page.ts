import { Component } from '@angular/core';
import { LocalServiceService } from '../local-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  mycord;
  resp;
  mycity;
  constructor(
    private localservice: LocalServiceService,
    private geolocation: Geolocation,

  ) {

    this.getCurrentLocation()
    this.localservice.requestViaGet(this.localservice.fetchURLKeyword() + 'Delhi').subscribe((res: any) => {
     // this.localservice.loading.dismiss()
      this.resp = res;
    })
  }

  exitapp() {
    navigator['app'].exitApp();
  }

  trackByMyLocation() {
    this.getCurrentLocation()
    if (this.mycord.lat) {
      this.localservice.requestViaGet('https://api.waqi.info/feed/geo:' + this.mycord.lat + ';' + this.mycord.lng + '/?token=a691947dea235f0505fffd3ef7d5567845df9689').subscribe((res: any) => {
        console.log(res)
        this.mycity = res.data.city
        console.log(this.localservice.AirQualityCheck(res.data.aqi))
        this.localservice.loading.dismiss();
      })
    } else {
      this.getCurrentLocation()

    }


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
