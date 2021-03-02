const TABLE_NAME = 'admins';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    firstName: { type: String, require: false, default: "" },
    lastName: { type: String, require: false, default: "" },
    email: { type: String, require: true, unique: true },
    mobile: { type: Number, required: true, unique: true },
    adminType: { type: String, default: 1 },
    password: { type: String, required: true },
}, { timestamps: true });

/** Model Statics */
TableSchema.statics = {
    getById(id, fields = []) {
        return this.findById(id).select(fields).lean().exec()
    },

    getByEmail(email, fields = []) {
        return this.findOne({ email: email }).select(fields).lean().exec();
    },

    getByMobile(mobile, fields = []) {
        return this.findOne({ mobile: mobile }).select(fields).lean().exec();
    },

    updateById(id, updateObj) {
        return this.updateOne(
            { _id: id }, {
            $set: updateObj
        }).exec().then((data) => {
            if (data) {
                return data;
            }
            const err = 'Error in updating the record!';
            return Promise.reject(err);
        }).catch(err => {
            return Promise.reject(err);
        })
    }
};

const TableModel = mongoose.model(TABLE_NAME, TableSchema);
module.exports = TableModel;