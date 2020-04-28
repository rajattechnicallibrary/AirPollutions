import { Component } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { LocalServiceService } from '../local-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  resp;
  searchCountryString;
  countries = []
  airQualityIndexType
  mycity
  aqi
  constructor(
    public toastController: ToastController,
    private localservice: LocalServiceService,
    private geolocation: Geolocation,
  ) { }

  searchCountry(searchbar) {
    if (this.searchCountryString.length > 3) {
      setTimeout(() => {
        this.localservice.requestViaGet(this.localservice.fetchURLKeyword() + this.searchCountryString).subscribe((res: any) => {
          this.airQualityIndexType = false
          this.mycity = false
          this.aqi = false
          this.resp = res.data;
          this.countries = res.data;
        })
      }, 200)
    }
  }

  openMyindex(index, b) {
    console.log(index, b)
    if (b.aqi == '-') {
      alert("This Air Quality Index is not available Yet");
      return
    }
    this.airQualityIndexType = this.localservice.AirQualityCheck(b.aqi)
    this.mycity = b.station
    this.aqi = b.aqi
    this.searchCountryString = '';

  }
}
