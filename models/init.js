const mongoose = require('mongoose');
const User = mongoose.model('User');
const Folder = mongoose.model('Folder');

(async()=>{
    try{
            
        const onlyUser = new User({
            displayName:'Sunny Setia',
            username:'sunnysetia',
            password:'sunnysetia'
        })

        const fetchedUser = await User.findOneOrCreate({username:'sunnysetia'},onlyUser)
        console.log("Found/Created a default user!");
        
        // const now = Date.now();
        // const rootFolder = new Folder({
        //     name:'root',
        //     createdOn:now,
        //     _user:fetchedUser,
        //     _parentFolder:null
        // })
        
        // Folder.findOneOrCreate({_parentFolder:null},rootFolder);
        // console.log("Found/Created a root folder!");
        
    }
    catch(err){
        console.log("error creating/fetching user/default folder",err);
    }
})()