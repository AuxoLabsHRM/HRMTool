import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EmployeeRole = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    golbalPerms: {
        type: String
    },
    privatePerms: {
        type: String
    }
});

export default mongoose.model('EmployeeRole', EmployeeRole);