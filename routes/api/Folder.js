const route = require('express').Router();
const mongoose = require('mongoose');
const Folder = mongoose.model('Folder');
const File = mongoose.model('File');

route.get('/', async (req,res)=>{
    try{
        const folders = await Folder
                            .find({_user:req.user._id,_parentFolder:null})
        const files = await File.find({_user:req.user._id,_parentFolder:null})
        return res.status(200).json({folders,files});
    }
    catch(err){
        res.status(401).json({error:true,message:'error retrieving folders'});

    }
})

route.get('/:parentId', async (req,res)=>{
    try{
        const parentId = req.params.parentId;
        const folders = await Folder.find({_user:req.user._id,_parentFolder:parentId})
                                    .populate({
                                        path : '_parentFolder',
                                        populate : {
                                          path : '_parentFolder'
                                        }
                                      })

        const files = await File.find({_user:req.user._id,_parentFolder:parentId})
        return res.status(200).json({folders,files});
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

        let parentFolder = null;
        if(parentId!=null){
            parentFolder = await Folder.findOne({_user:req.user._id,_id:parentId});
            if(parentFolder==null){
                return res.status(401).json({error:true,message:'error creating new folder'});        
            }
        }
            
        const newFolder = new Folder({
            name:folderName,
            createdOn:now,
            _parentFolder:parentFolder,
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
        let foldersToBeDeleted = [];
        let filesToBeDeleted = [];
        
        let currFolder = await Folder.findOne({_id:currId,_user:req.user._id});
        if(!currFolder)
            return res.status(404).json({error:true,message:"no folder to delete"});
            
            while((currFolder && !Array.isArray(currFolder)) || (Array.isArray(currFolder) && currFolder.length!=0)){
                let children=[];
                if(Array.isArray(currFolder)){
                    for(let i=0;i<currFolder.length;i++){
                        let parent = currFolder[i];
                        foldersToBeDeleted.push(parent._id);
                        let fetched = await Folder.find({_parentFolder:parent._id,_user:req.user._id});
                        fetched!=null?children.push(...fetched):0;

                        let fetchedFiles = await File.find({_parentFolder:parent._id,_user:req.user._id});
                        fetchedFiles!=null?filesToBeDeleted.push(...fetchedFiles):0;
                    }
                }   
                else{
                    foldersToBeDeleted.push(currFolder._id);
                    let fetched = await Folder.find({_parentFolder:currFolder._id,_user:req.user._id});
                    fetched!=null?children.push(...fetched):0;

                    let fetchedFiles = await File.find({_parentFolder:currFolder._id,_user:req.user._id});
                    fetchedFiles!=null?filesToBeDeleted.push(...fetchedFiles):0;

                }

                currFolder=children;
            }


            for(let i=0;i<foldersToBeDeleted.length;i++){
                let deleted = await Folder.deleteMany({_id:foldersToBeDeleted[i],_user:req.user._id});
                if(deleted.ok==0){
                    return res.status(404).json({error:true,message:"cannot delete subfolder and files"});
                }
            }

            
            for(let i=0;i<filesToBeDeleted.length;i++){
                let deleted = await File.deleteMany({_id:filesToBeDeleted[i]._id,_user:req.user._id});
                if(deleted.ok==0){
                    return res.status(404).json({error:true,message:"cannot delete subfolder and files"});
                }
            }

            console.log("all files deleted!");

            return res.status(202).json({error:false,message:"Successfully deleted"})
        
    }
    catch(err){
        console.log(err);
        res.status(404).json({error:true,message:"No folder found to delete"});
    }
})


module.exports = route;