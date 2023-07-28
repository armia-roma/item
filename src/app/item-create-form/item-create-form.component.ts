import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';
import { ItemInterface } from '../interface/ItemInterface';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'item-create-form',
  templateUrl: './item-create-form.component.html',
  styleUrls: ['./item-create-form.component.css']
})
export class ItemCreateFormComponent implements OnInit {
	manufacturers = [
		{ id: 1, name: "Jsp"},
		{ id: 2, name: "Spk"}
	];
	alert !: {message: string, type: string, display: boolean};
	constructor(private service: ItemService) {

	}
	form:FormGroup = new FormGroup( {
		name: new FormControl('', [Validators.required]),
		part_number: new FormControl(''),
		location: new FormControl(''),
		price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
		manufacturer_id: new FormControl(''),
		description: new FormControl('')
	})
	onSubmit(){
		// if(this.form.valid) {
			if(true) {
			this.service.create(this.form.value).subscribe(
				data => {	console.log(data)},
				(error: AppError)=> {
					if(error instanceof BadInput){
						console.log(error , "after new object")
						this.alert = {message: error.message, type: "error", display: true }
					}
					// this.alert= {message:  "", type: "", display: false}

					// if(error.status === 400){
					// 	let key = error.error.message.field
					// 	let errors = this.form.controls['name'].errors
					// 	this.form.get(key)?.setErrors({...errors, [key]: error.error.message.message})
					// }
				},
				() => {
					this.alert= {message:  "", type: "", display: false}
				}
			)
		}
	}
	onControlValueChanged(newvalue: any) {
		console.log(newvalue)
		this.form.get('name')?.setValue(newvalue)
	}
	get name () {
		return this.form.get('name')
	}
	get price () {
		return this.form.get('price')
	}
	ngOnInit() {
		this.alert = { message : "error", type : "error", display : false}
	}
}
