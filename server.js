const express=require('express');
const path=require('path')
const app= express();
const cors = require('cors'); 
const { env } = require('process');

app.use(cors());
app.use('/',express.static('./dist/invoice-app'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/dist/invoice-app/index.html'))
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
const port= 3000 || process.env.port;

app.listen(port,()=>{
    console.log("listening at"+ port)
})