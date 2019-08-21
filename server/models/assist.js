const mongoose = require('mongoose');
// esquemas de mogoose
let Schema = mongoose.Schema;

let assistSchema = new Schema({

    assistcontrol: {
        type: Schema.Types.ObjectId,
        ref: 'AssistControl',
        required: [true, 'El id de la lista de asistencia se necesita']
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id del participante se necesita']
    },
    date_time: {
        type: Date,
        required: [true, 'La fecha y hora de la asistencia se necesita']
    },
    feedback: {
        type: String,
        required: false,
        default: 'null'
    },
    status: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Assist', assistSchema);