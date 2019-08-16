const mongoose = require('mongoose');
// esquemas de mogoose
let Schema = mongoose.Schema;

let notificationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la notificacion es necesaria']
    },
    description: {
        type: String,
        required: [true, 'La descripcion de la notificacion es necesaria']
    },
    url_image: {
        type: String,
        required: false
    },
    url_extra: {
        type: String,
        required: false
    },
    date_time: {
        type: Date,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },

});

module.exports = mongoose.model('Notification', notificationSchema);