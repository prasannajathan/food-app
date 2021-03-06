import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = {email:'', password:''};

  constructor(public navCtrl: NavController, private auth:AuthService,private alertCtrl: AlertController) {
  }

  public register(){
    this.auth.register(this.registerCredentials).subscribe(success =>{
      if(success){
        this.createSuccess = true;
        this.showPopup("success","Account created");
        this.navCtrl.setRoot(HomePage);
      }else{
        this.showPopup("Error", "Problem creating account.");
      }
    }, error =>{
      this.showPopup("Error: ", error);
    });
  }

  showPopup(title, text){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle:text,
      buttons:[{
        text:"OK",
        handler: data=>{
          if(this.createSuccess){
            this.navCtrl.popToRoot();
          }
        }
      }]
    });
    alert.present();
  }

}
