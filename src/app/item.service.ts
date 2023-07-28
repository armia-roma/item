import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, catchError, throwError } from 'rxjs';
import {ItemInterface} from "./interface/ItemInterface"
import { AppError} from "./common/app-error"
import { BadInput} from "./common/bad-input"

class Item {
	name;
	part_number
	location
	price
	manufacturer_id
	description
	constructor(name: string, part_number:string, location: string, price: number, manufacturer_id: number,
		description: string){
		this.name = name
		this.part_number = part_number
		this.location = location
		this.price = price
		this.manufacturer_id = manufacturer_id
		this.description = description
	}
}


@Injectable({
	providedIn: 'root'
})
export class ItemService {
	url = "http://127.0.0.1:3000/item"
	constructor(private http :HttpClient) { }
	create (data: any):Observable<ItemInterface>{
		return this.http.post<ItemInterface>(this.url, data).pipe(
			map(response  => new Item (response.name, response.part_number, response.location, response.price,response.manufacturer_id, response.description )),
			catchError(
				err => {
					if(err.status === 400) {
						console.log(err)
						return throwError(() => new BadInput(err, err.data))
					}
					return throwError(() => new AppError())
				}
			)
		)
	}
}
