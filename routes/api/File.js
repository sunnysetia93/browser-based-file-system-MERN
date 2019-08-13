const route = require('express').Router();
const mongoose = require('mongoose');
const File = mongoose.model('File');
const Folder = mongoose.model('Folder');

route.get('/',async(req,res)=>{
    try{
        const file = await File.find({_user:req.user._id,_parentFolder:null})
        return res.status(200).json(file);
    }
    catch(err){
        res.status(401).json({error:true,message:'error retrieving file'});
    }
})

route.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        if(id=="" || id==null){
            res.status(401).json({error:true,message:'error retrieving file'});
        }
        const file = await File.find({_user:req.user._id,_id:id})
        return res.status(200).json(file);
    }
    catch(err){
        res.status(401).json({error:true,message:'error retrieving file'});
    }
})

route.post("/",async(req,res)=>{
    try{
        const {parentId,name,fileType,extension,content} = req.body;
        const checkParent = await Folder.findOne({_id:parentId});
        if(checkParent){

            const newFile = new File({
                name:name,
                fileType:fileType,
                extension:extension,
                content:content,
                _parentFolder:parentId,
                _user:req.user
            })

            const createdFile = await newFile.save();
            return res.status(200).json(createdFile);
        }

        res.status(401).json({error:true,message:'folder is incorrect'});        
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:true,message:'error creating new file'});
    }
})

route.put('/',async(req,res)=>{
    try{
        const currId = req.body.id;
        const updatedName = req.body.updatedName;
        if(currId && updatedName){
            const currFile = await File.findOneAndUpdate({_id:currId,_user:req.user._id},{name:updatedName})
            if(currFile){
                return res.status(200).json({error:false,message:'Successfully Updated'});
            }
            return res.status(404).json({error:true,message:'no File found'})
        }

        return res.status(404).json({error:true,message:'required parameters missing'})
    }
    catch(err){
        return res.status(404).json({error:true,message:'Error updating File name'})
    }
})

route.delete('/',async(req,res)=>{
    try{
        const currId=req.body.id;

        const deletedCurrFile = await File.deleteOne({_id:currId,_user:req.user._id});
        if(deletedCurrFile.ok===0){
            return res.status(404).json({error:true,message:"cannot delete current file"});
        }
        
        return res.status(202).json({error:false,message:"Successfully deleted"})
    }
    catch(err){
        console.log(err);
        res.status(404).json({error:true,message:"No file found to delete"});
    }
})

module.exports = route;