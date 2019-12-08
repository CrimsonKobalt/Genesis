var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Event2Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 40
        }
    }
);

module.exports = mongoose.model('aanwezige2', Event2Schema);