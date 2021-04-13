const exp=require("express")
const app=exp();
const path=require("path")
const mc=require("mongodb").MongoClient

require("dotenv").config()
app.use(exp.static(path.join(__dirname,"./dist/project")))

//import the apis
const userApiObj=require("./APIS/userapi")
const notesApiObj=require("./APIS/notesapi")
const remApiObj=require("./APIS/remapi")

app.use("/user",userApiObj)
app.use("/notes",notesApiObj)
app.use("/rem",remApiObj)


const dburl="mongodb+srv://lavanyaDataBase:vandana@123@cluster0.q2xjq.mongodb.net/<dbname>?retryWrites=true&w=majority"
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    //get database
    const databaseObj=client.db("keep")
    const userCollectionObj=databaseObj.collection("usercollection")
    const notesCollectionObj=databaseObj.collection("notescollection")
    const remCollectionObj=databaseObj.collection("remcollection")

    //sharing collection object

    app.set("userCollectionObj",userCollectionObj)
    app.set("notesCollectionObj",notesCollectionObj)
    app.set("remCollectionObj",remCollectionObj)

    console.log("db server is on")
})
.catch(err=>console.log("err in db",err))

app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`});
})

app.use((err,req,res,next)=>{
    res.send({message:"error occurred",reason:err.message})
})


app.listen(process.env.port||8080);