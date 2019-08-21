const mongoose = require('mongoose');
// esquemas de mogoose
let Schema = mongoose.Schema;

let scheduleSchema = new Schema({

    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
        required: [true, 'El id de la actividad se necesita']
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id del participante se necesita']
    },
    status: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Schedule', scheduleSchema);