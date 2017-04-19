import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  /*	constructor(public http: Http){
      console.log('Hello Auth provider');
  }*/

  public login(credentials) {
    console.log("Login",credentials);
      if (credentials.email === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        //Here you would normally perform your backend request and maybe store a token if you get one
        return Observable.create(observer => {
          // At this point make a request to your backend to make a real check!
          let access = (credentials.email === "email" && credentials.password === "pass");
          this.currentUser = new User('Prasanna', 'pras@food.com');
          observer.next(access);
          observer.complete();
        });
    }
  }

  public register(credentials) {
    console.log("Register", credentials);
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    console.log("getUserInfo", this.currentUser);
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
  //https://devdactic.com/login-ionic-2/
  /*
  login(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000)
    });
  }*/
}