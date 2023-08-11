import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemInterface } from '../interface/ItemInterface';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.css']
})
export class ItemDisplayComponent implements OnInit{
	constructor(public service: ItemService, private route: ActivatedRoute) {}
	item! :ItemInterface
	ngOnInit(): void {
		const route = this.route.snapshot.paramMap
		const id = Number(route.get('id'))
		this.service.get(id).subscribe(
			(val) => this.item = val
		)
	}
}
