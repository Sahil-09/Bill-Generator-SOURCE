const express=require('express');
const path=require('path')
const app= express();
const cors = require('cors'); 
const razorpay=require('razorpay')


let instance = new Razorpay({
  key_id: 'rzp_test_Cem9xOAy7ZJPWK',
  key_secret: 'rzp_test_Cem9xOAy7ZJPWK',
});

app.use(cors());
app.use('/',express.static('./dist/invoice-app'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/invoice-app/index.html'))
})

app.post("/api/invoice",(req,res)=>{
  instance.invoice
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "*"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "*"
    );
    next();
  });
const port= process.env.port || 3000;
app.listen(port,()=>{
    console.log("listening at"+ port)
})