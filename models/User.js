const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    displayName: String,
    username: String,
    password: String
});

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
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

mongoose.model('User', userSchema);
