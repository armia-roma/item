// import { AppError } from "./app-error"


export class BadInput extends Error{
    data?: any;
    constructor(message: string, data?: any) {
        super(message) 
        this.data = data
    }
}