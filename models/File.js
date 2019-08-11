const mongoose = require('mongoose');
const {Schema} = mongoose;

const fileSchema = new Schema({
    name:String,
    content: String,
    fileType:String,
    extension:String,
    createdOn: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _parentFolder: {type:Schema.Types.ObjectId, ref:'Folder' }
});

mongoose.model('File', fileSchema);
