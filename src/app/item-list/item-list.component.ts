import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemInterface } from '../interface/ItemInterface';
import { ItemService } from '../item.service';
import Item from '../common/Item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy{
	constructor(private service: ItemService) {
	}
	items !: ItemInterface[]
	filteredItems!: ItemInterface[]
	subscription!: Subscription
	collectionSize !: number		
	page = 1;
	pageSize = 10;
	limit = 10;
	offset = 0;
	

	filter(query: string){
		this.filteredItems =  (query) ? 
			this.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : 
			this.items;
	}
	refreshItems() {
		this.limit= this.pageSize
		this.offset= (this.page - 1) * this.pageSize
		this.fetchData()

	}
	fetchData() {
		this.subscription = this.service.list({limit: this.limit, offset: this.offset}).subscribe(
			items => {
				this.filteredItems = this.items = items.data
				this.collectionSize = items.count
			} ,
			error => alert(error)
		)
	}
	ngOnInit() {
		this.fetchData()

	}
	ngOnDestroy() {
		this.subscription.unsubscribe
	}
}
