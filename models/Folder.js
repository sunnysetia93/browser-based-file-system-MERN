const mongoose = require('mongoose');
const {Schema} = mongoose;

const folderSchema = new Schema({
    name:String,
    createdOn: Date,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _parentFolder: {type:Schema.Types.ObjectId, ref:'Folder' }
});

folderSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
    const self = this;
    const newDocument = doc;

    return new Promise((resolve, reject) => {

        return self.findOne(condition)
            .then((result) => {
                if (result) {
                    return resolve(result);
                }
                return self.create(newDocument)
                    .then((result) => {
                        return resolve(result);
                    }).catch((error) => {
                        return reject(error);
                    })
            }).catch((error) => {
                return reject(error);
                })
        });
};

mongoose.model('Folder', folderSchema);
