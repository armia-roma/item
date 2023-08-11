export default class Item {
	id;
	name;
	part_number
	location
	price
	manufacturer_id
	description
	manufacturer?: string

	constructor(id: number, name: string, part_number:string, location: string, price: number, manufacturer_id: number,
		description: string, manufacturer?: string){
		this.id = id
		this.name = name
		this.part_number = part_number
		this.location = location
		this.price = price
		this.manufacturer_id = manufacturer_id
		this.description = description
		this.manufacturer = manufacturer
	}
}