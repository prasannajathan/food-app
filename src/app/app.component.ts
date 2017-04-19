import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage }  from '../pages/login/login';
//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  //rootPage: any = TabsPage;;
  rootPage = LoginPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      //console.log(platform);
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      //rootPage.login();
      
    });
    /*
    this.auth.login().then((isLoggedIn) => {
      if(isLoggedIn){
        this.rootPage = TabsPage;
      }else{
        this.rootPage = LoginPage;
      }
    });*/
  }
}
