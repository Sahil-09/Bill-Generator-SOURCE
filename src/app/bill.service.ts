import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class billservice{

    invoice_data

    bill(data){
        this.invoice_data=data
    }
}