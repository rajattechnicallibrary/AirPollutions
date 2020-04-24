import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

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
  constructor(
    public toastController: ToastController,

  ) {
  }
  toggle() {

    let options = {
      prompt: "Developed By Rajat Gupta (Technical Library)",
      showFlipCameraButton:true,
      showTorchButton:true,
      disableSuccessBeep:false,
      torchOn:false,
    }

  
  }



}
