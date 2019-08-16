const mongoose = require('mongoose');
// esquemas de mogoose
let Schema = mongoose.Schema;

let sponsorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del sponsor es necesaria']
    },
    description: {
        type: String,
        required: [true, 'La descripcion del sponsor es necesaria']
    },
    url_website: {
        type: String,
        required: false
    },
    url_image: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },

});

module.exports = mongoose.model('Sponsor', sponsorSchema);