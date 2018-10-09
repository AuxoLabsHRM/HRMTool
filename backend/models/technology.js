import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TechnologySchema = new Schema({
    name: {
        type: String
    },
    auther: {
        type: String
    },
    description: {
        type: String
    },
    established: {
        type: String
    },
    latestVersion: {
        type: String
    },
    docURL: {
        type: String
    }
});

export default mongoose.model('Technology', TechnologySchema);