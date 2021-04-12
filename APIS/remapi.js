const exp=require("express");
const webpush=require("web-push");
const cors=require("cors");
const { promise } = require("selenium-webdriver");
const remApiObj=exp.Router();
remApiObj.use(exp.json());
remApiObj.use(cors());
const publicKey="BEvbLxOBvw5R8186WKA1juNrl6I-MLKR3cYOB51QGcFJiX9aWJfEb5CTT7FILn1RUUmXZ85cj5Opl9Nw1Xe_A2M"; 
const privateKey="4CKsf7yTB867RmM2RklwZYNOpo2EEEBf0YWRBP4GSE0";
remApiObj.post("/subs",(req,res)=>{
    let sub =req.body;
    webpush.setVapidDetails(
        'mailto:lavanyagandabani1213@gmail.com',
        publicKey,
        privateKey
    )
    let payload=JSON.stringify({
        Notification:{
            "title":"lavanya",
            "body":"this is first notification"

        }
    });
    setInterval(()=>{
        promise.resolve(webpush.sendNotification(sub,payload))
        .then(()=>res.json({
            message:"notification sent"
        }))
        .catch((err)=>{
            console.log("err in noti",err)
        })
    },5000)
})








module.exports=remApiObj;