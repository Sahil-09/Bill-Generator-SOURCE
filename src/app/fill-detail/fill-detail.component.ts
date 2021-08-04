import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { billservice } from '../bill.service';

@Component({
  selector: 'app-fill-detail',
  templateUrl: './fill-detail.component.html',
  styleUrls: ['./fill-detail.component.css']
})

export class FillDetailComponent implements OnInit {

  constructor(private router:Router,private billser:billservice) { }
  Billform:FormGroup
  ngOnInit(){

    this.Billform=new FormGroup({
      name:new FormControl(null,Validators.required),
      date:new FormControl(null,Validators.required),
      items:new FormArray([])
    })
  }

  data:any[]=[
    'sahil',
    'jett','aalam'
  ]
  nav(){
    this.billser.bill('hello')
    this.router.navigate(['bill'])
  }

  additem(){
    let ctrl=new FormGroup({
      item:new FormControl(null),
      unit:new FormControl(1),
      price:new FormControl(null)
    })
    let form=this.Billform.get('items') as FormArray;
    form.push(ctrl)
  }

  remove(i){
    let form=this.Billform.get('items') as FormArray;
    form.removeAt(i)
  }

  submit(){
    this.billser.bill(this.Billform.value)
    this.router.navigate(['bill'])
  }

  reset(){
    this.Billform.reset()
  }
}
