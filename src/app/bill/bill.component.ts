import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { billservice } from '../bill.service';
import * as h2p from 'html2pdf.js'

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {



  constructor(private billser:billservice,private http: HttpClient) { }

  invoiceno:string
  invoicedata={
    name:"test",
    date:"1-1-21",
    items:[{
      item:"test",
      amount:9,
      quantity:1
    },{
      item:"test",
      amount:9,
      quantity:1
    }]
  };
  paymentlink:string="";
  razrpay:string=""
  // qrcode:string="https://www.upiqrcode.com/upi-qr-code-api/v01/?apikey=jogasy&seckey=kraddy&vpa=kraddy@paytm"
  qrcode:string="https://upiqr.in/api/qr?name=sahil%20Patel&vpa=kraddy@paytm"
  total=0
  
  ngOnInit(){
    console.log(this.invoicedata)
    console.log(this.billser.invoice_data)
    this.invoicedata=this.billser.invoice_data;
    for(let a of this.invoicedata.items){
      this.total+=a.amount*a.quantity
      console.log(this.total)
    }

    
    this.qrcode+="&amount="+this.total
    


    let tdata= new FormData()
    tdata.append("grant_type","client_credentials")
    tdata.append("client_id","cnE27xVq4OAwx7vdt15WXmmHz5SUBh7bnHlP2r0M")
    tdata.append("client_secret","RBpWQ9mKiLDyU37NkSaH4beGFTd2LoWU9T3bIb04vaw7BXtLMHI5YVl6IeumUi86ac8QyEr0hTbbI1i1YxBgnUe8IhU2HIALklfiVhPgHYTQBXQjZpjx0yuTJ7KXzfTk")
  

    this.http.post<{access_token:string}>("oauth2/token/",tdata).subscribe(res=>{
     console.log(res)
     console.log(this.total)
     let payload={
      amount:this.total,
      purpose:"GFX"
    }
      this.http.post("v2/payment_requests/",payload,{
        headers:new HttpHeaders({
          'Authorization': 'Bearer '+res.access_token})
      }).subscribe(result=>{
        console.log(result)
        this.invoiceno=result['id'].slice(0,4)
        this.paymentlink=result['longurl']
      })
    })


    // type:"invoice",
    //   description:"GFX invoice",
    //   customer:{
    //     name:this.invoicedata.name
    //   },
    //   line_items:this.invoicedata.items,
    //   currency:"INR"
    let iteml=[]

    for(let a of this.invoicedata.items){
      let d={
        name:a.item,
        description:"",
        amount:a.amount*100,
        currency:"INR",
        quantity:a.quantity
      }
      iteml.push(d)
    }

    let payload={
      type:"invoice",
        description:"GFX invoice",
        customer:{
          name:this.invoicedata.name,
          contact: 9768957932
        },
        line_items:iteml,
        currency:"INR",
        sms_notify: 1
    }

    this.http.post("/v1/invoices",payload,{
      headers: new HttpHeaders({
        'Authorization':'Basic ' + btoa('rzp_live_ZABRnsAoDhgCoP:XtvpgLSuvdoyzwo2QW5KWU9a')
      })
    }).subscribe(result=>{
      console.log(result)
      this.razrpay=result['short_url']
    })


  }
  
  print(){
    // let opt={
    //   margin:       1,
    //   filename:     'Invoice.pdf',
    //   html2canvas:  { width: 595, height: 842},
    //   jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true },
    // }
    // h2p(document.getElementById("main-bill"),opt);
    // console.log(document.getElementById('main-bill'))
    document.getElementById('print').style.display="none"
    
    window.print()
  }

}
