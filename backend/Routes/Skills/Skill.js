var mongoose = require('mongoose');
var SkillsSchema = new mongoose.Schema({
  userId: String,
  skill: {
      id: String,
      name: String
  },
  detail: String,
  lastModified: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('Skills', SkillsSchema, 'Skills');


// {
//     "_id": ObjectId("51ec4ac3eb7f7c701b000000"),
//     "gpx": {
//         "metadata": {
//             "desc": "Nürburgring VLN-Variante",
//             "country": "de",
//             "isActive": true
//         },
//     "trk": [
//     {
//         "lat": 50.3299594,
//         "lng": 6.9393006
//     },
//     {
//         "lat": 50.3295046,
//         "lng": 6.9390688
//     }]
//     }
// }

// var TrackSchema = Schema({
//     _id: Schema.ObjectId,
//     gpx: {
//         metadata: {
//             desc: String,
//             country: String,
//             isActive: Boolean
//         },
//         trk: [{lat:Number, lng:Number}]
//     }
// });