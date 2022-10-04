const express=require('express');
const path=require('path');
const fs=require('fs');
const app=express();
const port=8080;
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const mongoose=require('mongoose');
const { dirname } = require('path');
mongoose.connect('mongodb://localhost/fbclone',{useNewUrlParser:true},{useUnifiedTopology:true});

const fbSchema={
    phone:String,
    password:String,
};
const datas=mongoose.model('Daataa',fbSchema);

app.use('/static',express.static('static'));

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
});
app.post("/",function(req,res){
   let mydata=new datas({
    phone:req.body.phone,
    password:req.body.password,
   });
   mydata.save();
   res.redirect("/");

   
});
app.listen(port,()=>{
    console.log(`the server has been started on the port ${port}`);
});


