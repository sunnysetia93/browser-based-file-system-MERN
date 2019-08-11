const route = require('express').Router();
const mongoose = require('mongoose');
const Folder = mongoose.model('Folder');

route.get('/', async (req,res)=>{
    try{
        const folders = await Folder.find({_user:req.user._id,_parentFolder:null})
        return res.status(200).json(folders);
    }
    catch(err){
        res.status(401).json({error:true,message:'error retrieving folders'});

    }
})

route.get('/:parentId', async (req,res)=>{
    try{
        const parentId = req.params.parentId;
        const folders = await Folder.find({_user:req.user._id,_parentFolder:parentId})
        return res.status(200).json(folders);
    }
    catch(err){
        res.status(401).json({error:'error retrieving folders for this parent folder'});
    }
})

route.post('/',async(req,res)=>{
    try{
        const parentId = req.body.parentId;
        const folderName = req.body.name;
        const now = Date.now();

        const newFolder = new Folder({
            name:folderName,
            createdOn:now,
            _parentFolder:parentId,
            _user:req.user
        })

        const createdFolder = await newFolder.save();
        return res.status(200).json(createdFolder);
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:true,message:'error creating new folder'});
    }
})

route.put('/',async(req,res)=>{
    try{
        const currId = req.body.id;
        const updatedName = req.body.updatedName;

        if(currId && updatedName){
            const currFolder = await Folder.findOneAndUpdate({_id:currId,_user:req.user._id},{name:updatedName})
            if(currFolder){
                return res.status(200).json({error:false,message:'Successfully Updated'});
            }
            return res.status(404).json({error:true,message:'no folder found'})
        }

        return res.status(404).json({error:true,message:'required parameters missing'})
    }
    catch(err){
        return res.status(404).json({error:true,message:'Error updating folder name'})
    }
})

route.delete('/',async(req,res)=>{
    try{
        const currId=req.body.id;
        const currFolder = await Folder.findOne({_id:currId,_user:req.user._id});
        if(!currFolder)
            return res.status(404).json({error:true,message:"no folder to delete"});

        const deleted = await Folder.deleteMany({_parentFolder:currId,_user:req.user._id});
        console.log(deleted);
        if(deleted.ok===0){
            return res.status(404).json({error:true,message:"cannot delete subfolder and files"});
        }
        const deletedCurrFolder = await Folder.deleteOne({_id:currId,_user:req.user._id});
        if(deletedCurrFolder.ok===0){
            return res.status(404).json({error:true,message:"cannot delete current folder"});
        }
        
        return res.status(202).json({error:false,message:"Successfully deleted"})
    }
    catch(err){
        console.log(err);
        res.status(404).json({error:true,message:"No folder found to delete"});
    }
})


module.exports = route;