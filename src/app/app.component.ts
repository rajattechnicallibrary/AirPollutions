import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,


  ) {
    this.initializeApp();
  }

  initializeApp() {

    // 6390095322
    this.platform.ready().then(() => {
      this.backButtonEvent();
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal 
        .startInit("cc0d552f-97b9-41c8-8a48-3373112f43eb", "540233607089")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#ff3399");
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    var dualCounter = 0;
    this.platform.backButton.subscribe(async () => {
      dualCounter++;
      const toast = await this.toastController.create({
        message: 'Press again to exit app.',
        duration: 2222
      });
      toast.present();
      console.log(dualCounter);
      if (dualCounter == 2) {
        navigator['app'].exitApp();
      }
    });

  }
}
