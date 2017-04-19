import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController } from 'ionic-angular';
import { Geolocation} from 'ionic-native';
//GoogleMap, , GoogleMapsEvent, GoogleMapsLatLng 
import 'rxjs/add/operator/map';

import { AuthService } from '../../providers/auth-service';
//import { TabsPage } from '../tabs/tabs';

import { LoginPage } from '../login/login';
import { RestaurantDetailsPage } from '../restaurant-details/restaurant-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  restaurants: any;
	username ="";
	email="";
	userLatitude:any | number;
	userLongitude:any | number;
	restaurantlatLong:string;

  constructor(public navCtrl: NavController, public http: Http, private auth:AuthService) {

	let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;


//Get currentLocation from native Geolocation()
		Geolocation.getCurrentPosition().then((resp) => {
			//User lat long - 12.930976, 77.570506
			this.userLatitude = resp.coords.latitude;
			this.userLongitude = resp.coords.longitude
			console.log(resp, this.userLatitude, this.userLongitude);

				this.http.get('../../assets/json/restaurants.json').map(res => res.json()).subscribe(data => {
					//console.log(data);
					this.restaurants = data;
					//restaurant lat long --latLong
					//
					for(var i=0; i<this.restaurants.length; i++){
						//console.log(this.restaurants[i].latLong);
						this.http
						.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+this.userLatitude+','+this.userLongitude+'&destinations='+this.restaurants[i].latLong+'&key=AIzaSyCU8oG17_kdvrJqZ0LBnBSh6nRC_9Fyl9U')
						.map(res=> res.json()).subscribe(data=> {
							console.log(data.rows[0].elements[0].distance.text, data.rows[0].elements[0].duration.text);
						});
					}
				}, err => {
					console.log("oops");
				});

		}).catch((error)=>{
			//console.log('Error getting location', error);
			this.http.get('../../assets/json/restaurants.json').map(res => res.json()).subscribe(data => {
					console.log(data);
					this.restaurants = data;
					//restaurant lat long --latLong
					//
					for(var i=0; i<this.restaurants.length; i++){
						//console.log(this.restaurants[i].latLong);
						this.http
						.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+this.userLatitude+','+this.userLongitude+'&destinations='+this.restaurants[i].latLong+'&key=AIzaSyCU8oG17_kdvrJqZ0LBnBSh6nRC_9Fyl9U')
						.map(res=> res.json()).subscribe(data=> {
							console.log(data.rows[0].elements[0].distance.text, data.rows[0].elements[0].duration.text);
						});
					}
				}, err => {
					console.log("oops");
				});
		});

  }

public logout(){
		this.auth.logout().subscribe(succ => {
			localStorage.removeItem("Loggedin");
			this.navCtrl.setRoot(LoginPage);
		});
	}

goToDetails(id:string){
		//console.log(id)
  	this.navCtrl.push(RestaurantDetailsPage, {id});
}

searchRestaurantDB(event, key){
	//http://www.gajotres.net/ionic-2-tutorial-lets-create-our-first-application/2/
	if(event.target.value.length>2){
		console.log(event, key);
	}

}

}
