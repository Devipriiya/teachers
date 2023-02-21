import express from "express";
import connectDB from "./teachersdb.js";
import mongoose from "mongoose";

const teachersSchema=mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        },
    id:{
         type:String,
        required:true,
     },
                    
            
           
     })

var Teachers = mongoose.model('Teachers', teachersSchema);
teachersSchema.plugin(Teachers);


connectDB();
const app=express();
app.use(express.json());

const teachers=[{
    name:"Damodaran",
    id:"101",
},
{
    name:"aswini",
    id:"102",
},
{
    name:"rathiga",
    id:"103",
},
{
    name:"megha",
    id:"104",
},
{
    name:"hari",
    id:"105",
},
{
    name:"vinodhini",
    id:"106",
},
{
    name:"pavithra",
    id:"107",
},
{
    name:"priya",
    id:"108",
},
]


app.get("/api/teachers",(req,res) =>
{
    try{
        res.status(200).send(teachers);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
app.post("/api/teachersdetails",async(req,res)=>{
    try{
        const teachers={
           name:req.body.name,
            id:req.body.id,
           
        }
        console.log(teachers);
        var create=new Teachers(teachers);
        var teachersCreated=await create.save();
      
        if(teachersCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
app.put('/api/teachers/:id',(req,res)=>{
    console.log(req.params.id);
    Teachers.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            name:req.body.name,
            id:req.body.id,

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_teachers:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete("/api/teachers/:id",(req,res)=>{
        console.log(req.params.id);
        Teachers.deleteOne({_id:req.params.id},{
            $set:{
               
                name:req.body.name,
                id:req.body.id,
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_teachers:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete("/api/teachers",(req,res)=>{
    
            Teachers.deleteMany({teachers},(err,result)=>{
            if(err) throw err
            res.send(teachers)
            })
        })
const port=3000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    console.log(teachers);
});