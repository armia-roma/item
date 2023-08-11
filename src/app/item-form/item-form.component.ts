import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
	id!: number
	alert!: {
		message: string,
		display: boolean,
		type: string
	}
	constructor(
		private router: Router,
		route: ActivatedRoute,
		private service: ItemService
	){
			this.id = Number( route.snapshot.paramMap.get('id'));
			if(this.id) this.service.get(this.id).subscribe(item => this.form.patchValue({...item, price: Number(item.price)}))
	}
	manufacturers = [
		{ id: 1, name: "Jsp"},
		{ id: 2, name: "Spk"}
	]; 
	form:FormGroup = new FormGroup( {
		name: new FormControl('', [Validators.required]),
		part_number: new FormControl('', [Validators.required]),
		location: new FormControl('', [Validators.required]),
		price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
		manufacturer_id: new FormControl<number|null>(null),
		description: new FormControl('')
	})
	get name () {
		return this.form.get('name')
	}
	get price () {
		return this.form.get('price')
	}
	keyPress(event: any) {
		const pattern = /[0-9\+\-\,\ ]/;
	
		let inputChar = String.fromCharCode(event.charCode);
		if (event.keyCode != 8 && !pattern.test(inputChar)) {
		  event.preventDefault();
		}
	}
	submit() {
		if(this.form.valid) {
			if(this.id){
				this.service.update(this.form.value, this.id).subscribe(
					(data :{ message?: string})=> {
						console.log(data)
						this.alert = { message: data.message? data.message: "" , type: "success", display: true } 
						console.log(this.alert)
					}
				)
			}else{
				this.service.create(this.form.value).subscribe(
					data => {
						this.router.navigate(['/item', data.id])
					},
					(error: AppError)=> {
						if(error instanceof BadInput){
							this.form.get(error.data.field)?.setErrors({serverError: error.data.message})
							this.alert = {message: error.message, type: "error", display: true }
							setTimeout(() => {
								this.alert ={...this.alert, display: false} ;
							}, 4000);
						}
					},
					() => {
						console.log("complete")
						this.alert= {message:  "", type: "", display: false}
					}
				)
			}
		}else{
			this.markFieldsAsTouched()
		}
	}
	markFieldsAsTouched() {
		Object.values(this.form.controls).forEach(control => {
			if(control.invalid){
				control.markAsTouched(); // Mark each control as touched
			}
		});
	}
	delete() { 
		try{
			if(!confirm('Are you sure you want to delete this product?')) return;
			this.service.remove(this.id).subscribe(
				data => {
					console.log(data)
					this.router.navigate(['/item'])
				}
			)
		}catch(err){
			console.log(err)
		}
	}
	ngOnInit() {
	}
}
