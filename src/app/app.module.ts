import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RestaurantDetailsPage } from'../pages/restaurant-details/restaurant-details';
import { CartPage } from '../pages/cart/cart';
import { AccountPage } from '../pages/account/account';

import { AuthService  } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    RegisterPage,
    RestaurantDetailsPage,
    CartPage,
    AccountPage

  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    LoginPage,
    RegisterPage,
    RestaurantDetailsPage,
    CartPage,
    AccountPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService]
})
export class AppModule {}
