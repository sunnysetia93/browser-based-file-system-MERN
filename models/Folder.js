const mongoose = require('mongoose');
const {Schema} = mongoose;

const folderSchema = new Schema({
    name:String,
    createdOn: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _parentFolder: {type:Schema.Types.ObjectId, ref:'Folder' }
});

mongoose.model('Folder', folderSchema);
