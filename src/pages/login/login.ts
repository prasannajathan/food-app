import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home'; 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
loading: Loading;

registerCredentials = {email: '', password: ''};

constructor(private navCtrl: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

public createAccount(){
  this.navCtrl.push(RegisterPage);
}
//https://www.youtube.com/watch?v=5WK9R1y-eKg
ionViewDidLoad() {
  // Put here the code you want to execute
    if(localStorage.getItem("Loggedin") !== null){
        this.registerCredentials = {email: 'email', password: 'pass'};
        this.login();
      }
}

public login() {
    
    this.showLoading();
    
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      
      if (allowed) {
        localStorage.setItem("Loggedin","1");
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage);
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
    
  }
  

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
