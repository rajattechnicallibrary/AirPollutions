import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {

  APIKEY = "a691947dea235f0505fffd3ef7d5567845df9689"
  URL = "https://api.waqi.info";
  IndiaLevelData: any;
  WorldLevelData: any;
  loading: any
  limitCounter: number;
  clearTimeSet
  version: any = '1.2.0'
  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
    public loadingController: LoadingController

  ) {

    // this.presentLoading();
    this.getCurrentLocation();
  }

  fetchURLKeyword() {
    return this.URL + "/search/?token=" + this.APIKEY + "&keyword=";
  }
  async presentLoading(val?) {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000
    });
    if (val) {
      await this.loading.present();
    } else {
      this.loading.dismiss();
    }
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp: any) => {
      let mycord = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }
      return mycord;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  requestViaGet(urlAction) {
    this.presentLoading();
    let httpOptions = {
      headers: new HttpHeaders({
        // "Access-Control-Allow-Origin": "*",
        // 'Content-Type':'application/text',
      })
    };
    return this.http.get(urlAction, httpOptions).pipe();
  }

  AirQualityCheck(indexValue) {
    if (indexValue >= 0 && indexValue <= 50) {
      let mycomb = {
        bgcolor:'#009966',
        color:'white',
        name : 'Good'
      }
      return mycomb;
    } else if (indexValue >= 51 && indexValue <= 100) {
      let mycomb = {
        bgcolor:'#ffde33',
        color:'black',
        name : 'Moderate'
      }
      return mycomb;
     // return "Moderate";
    } else if (indexValue >= 101 && indexValue <= 150) {

      let mycomb = {
        bgcolor:'#ff9933',
        color:'black',
        name : 'Sensitive'
      }
      return mycomb;
    } else if (indexValue >= 151 && indexValue <= 200) {

      let mycomb = {
        bgcolor:'#cc0033',
        color:'white',
        name : 'Unhealthy'
      }
      return mycomb;
    } else if (indexValue >= 201 && indexValue <= 300) {

      let mycomb = {
        bgcolor:'#660099',
        color:'white',
        name : 'Very Unhealthy'
      }
      return mycomb;

    
    } else if (indexValue >= 300) {

      let mycomb = {
        bgcolor:'#7e0023',
        color:'white',
        name : 'Hazardous'
      }
      return mycomb;
    }

  }

}
