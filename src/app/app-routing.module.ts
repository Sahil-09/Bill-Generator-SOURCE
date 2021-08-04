import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BillComponent } from "./bill/bill.component";
import { FillDetailComponent } from "./fill-detail/fill-detail.component";

const approute:Routes=[
    {path:'', component:FillDetailComponent},
    {path:'bill',component:BillComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(approute)],
    exports:[RouterModule]
})

export class Approuting{}