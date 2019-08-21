const mongoose = require('mongoose');
// esquemas de mogoose
let Schema = mongoose.Schema;

let assistControlSchema = new Schema({

    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: [true, 'El id de la actividad se necesita']
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id del staff se necesita']
    },
    name_staff: {
        type: String
    },
    name_activity: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('AssistControl', assistControlSchema);