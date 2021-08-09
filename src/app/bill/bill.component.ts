import { Component, OnInit } from '@angular/core';
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
      price:9,
      unit:1
    },{
      item:"test",
      price:9,
      unit:1
    }]
  };
  paymentlink:string="";
  qrcode:string
  total=0
  
  ngOnInit(){
    console.log(this.invoicedata)
    console.log(this.billser.invoice_data)
    this.invoicedata=this.billser.invoice_data;
    for(let a of this.invoicedata.items){
      this.total+=a.price*a.unit
      console.log(this.total)
    }

    

    


    let tdata= new FormData()
    tdata.append("grant_type","client_credentials")
    tdata.append("client_id","cnE27xVq4OAwx7vdt15WXmmHz5SUBh7bnHlP2r0M")
    tdata.append("client_secret","RBpWQ9mKiLDyU37NkSaH4beGFTd2LoWU9T3bIb04vaw7BXtLMHI5YVl6IeumUi86ac8QyEr0hTbbI1i1YxBgnUe8IhU2HIALklfiVhPgHYTQBXQjZpjx0yuTJ7KXzfTk")
  

    this.http.post<{access_token:string}>("https://api.instamojo.com/oauth2/token/",tdata,{
      headers:new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      })
    }).subscribe(res=>{
     console.log(res)
     console.log(this.total)
     let payload={
      amount:this.total,
      purpose:"GFX"
    }
      this.http.post("https://api.instamojo.com/v2/payment_requests/",payload,{
        headers:new HttpHeaders({
          'Authorization': 'Bearer '+res.access_token})
      }).subscribe(result=>{
        console.log(result)
        this.invoiceno=result['id'].slice(0,4)
        this.paymentlink=result['longurl']
        this.qrcode=`https://www.upiqrcode.com/upi-qr-code-api/v01/?apikey=jogasy&seckey=kraddy&vpa=kraddy@paytm&amount=${this.total}`
      })
    })


  }
  element=document.getElementById("main-bill")
  
  print(){
    let opt={
      margin:       1,
      filename:     'myfile.pdf',
      html2canvas:  { width: 595, height: 842},
      image:        { type: 'png', quality: 0.98 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true },
    }
    h2p(document.getElementById("main-bill"),opt);
    console.log(document.getElementById('main-bill'))
  }

}
