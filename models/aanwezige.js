var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Event1Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 40
        }
    }
);

module.exports = mongoose.model('aanwezige', Event1Schema);