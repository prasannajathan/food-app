import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map';

//import { HomePage } from '../home/home'; 

@Component({
	selector:'page-restaurant-details',
	templateUrl: 'restaurant-details.html'
})

export class RestaurantDetailsPage{
	id: string;
	restaurant:any;
	foodCount:any=0;


	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http){
		this.id = navParams.get("id");
		//this.foodCount = 0;

		this.http.get('../../assets/json/restaurant_'+ this.id +'.json').map(res => res.json()).subscribe(data =>{
			console.log(data);
			this.restaurant = data;

			//this.restaurantName= dataObj.name;
			//console.log(this.restaurant.name);
		}, err =>{
			console.log("Ooops");
		});

	}
	/**/
	public addFood($event, menuId){
		console.log($event, menuId)
		//this.menuId.foodCount = this.foodCount + 1;
	}
	public minusFood($event){
		//console.log($event)
		//if(this.foodCount){
			//this.foodCount = this.foodCount - 1;
		//}
	}
}