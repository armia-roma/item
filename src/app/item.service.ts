import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, catchError, throwError, take } from 'rxjs';
import {ItemInterface} from "./interface/ItemInterface"
import { AppError} from "./common/app-error"
import { BadInput} from "./common/bad-input"
import { NotFoundError } from './common/not-found-error';
import Item from './common/Item'

@Injectable({
	providedIn: 'root'
})
export class ItemService {
	url = "http://127.0.0.1:3000/item"
	constructor(private http :HttpClient) { }
	create (data: any):Observable<ItemInterface>{
		return this.http.post<ItemInterface>(this.url, data).pipe(
			map(response  => new Item (response.id ,response.name, response.part_number, response.location, response.price,response.manufacturer_id, response.description )),
			catchError(
				(err: HttpErrorResponse) => {
					if(err.status === 400) {
						return throwError(() => new BadInput(err.error.message, err.error.data))
					}
					return throwError(() => new AppError())
				}
			)
		)
	}
	get(id:number) {
		return this.http.get<ItemInterface>(`${this.url}\/${id}` )
		.pipe(
			take(1),
			map(response  => new Item (response.id ,response.name, response.part_number, response.location, response.price,response.manufacturer_id, response.description )),
			catchError(
				(err: HttpErrorResponse) => {
					if(err.status === 400) {
						return throwError(() => new NotFoundError())
					}
					return throwError(() => new AppError())
				}
			)
		)
	}
	list(params: any) {	
		return this.http.get<{ count: number,data: ItemInterface[]}>(`${this.url}s`,{params})
		.pipe(
			map((response)=> {
				return {
					data: response.data.map( item => new Item (
						item .id , 
						item.name, 
						item.part_number, 
						item.location, 
						item.price,
						item.manufacturer_id,
						item.description, 
						item.manufacturer 
						 
						)),
					count: response.count 
				}
			}),
			catchError(
				(err: HttpErrorResponse) => {
					if(err.status === 400) {
						return throwError(() => new NotFoundError())
					}
					return throwError(() => new AppError())
				}
			)
		)
	}
	update(data: any, id: number) {
		console.log(data)
		return this.http.put(`${this.url}/${id}`, data)
		.pipe(	

		)
	}
	remove(id: number){	
		return this.http.delete(`${this.url}/${id}`)
	}
}
