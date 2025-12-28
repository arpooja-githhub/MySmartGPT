

import express from "express";
import Thread from "../models/Thread.js";
import getOpenATAPIResponse from "../utils/openai.js";
const router = express.Router();


router.post("/test",async(req,res)=>{
    try{
        const thread = new Thread({
            threadId:"xyza",
            title:"testing for new thread",
        });
        const response  =await thread.save();
        res.send(response);
    }
    catch(err){ 
        console.log(err);
        res.status(500).json({error:"Failed to save to database."});
    }
});

//GET ALL THREADS
router.get("/thread",async(req,res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt:-1});
        //descending order of updated recent at the top
        res.json(threads);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to get threads"});
    }
});

router.get("/thread/:threadId",async(req,res)=>{
    const {threadId} = req.params;
    try{
        const thread = await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error:"Thread not found!"});
        }
        res.json(thread.messages);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to get threads"});
    }

});

router.delete("/thread/:threadId",async(req,res)=>{
    const {threadId}  =req.params;
    try{
        const deletedThread = await Thread.findOneAndDelete({ threadId }); ;
        if(!deletedThread){
            res.status(404).json({error:"Thread could not be deleted"});
        }
          res.status(200).json({error:"Thread deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete thread"});
    }
});

router.post("/chat",async(req,res)=>{
    const {threadId,message} = req.body;
    if(!threadId||!message){
        res.status(400).json({error:"Missing required  feilds"});
    }
    try{
        let thread = await Thread.findOne({threadId});
        const shortTitle = message
            .split(/[.?!]/)[0]   // take first sentence
            .split(" ")
            .slice(0, 4)         // first 4 words
            .join(" ");

        if(!thread){
            //create a new thread
            thread = new Thread({
                threadId,
                title:shortTitle,
                messages : [{role:"user",content:message}]

            });
        }
        else{
            thread.messages.push({role:"user",content:message});
        }
        const assistantReply = await getOpenATAPIResponse(message);
        thread.messages.push({role:"assistant",content:assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply:assistantReply});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Something went wrong!"});
    }
});
export default router;
