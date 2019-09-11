const mongoose = require('mongoose');
// esquemas de mogoose
let Schema = mongoose.Schema;

let activitySchema = new Schema({
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person',

        required: false
    },
    name: {
        type: String,
        required: [true, 'El titulo de la actividad es necesaria']
    },
    type: {
        type: String,
        required: [true, 'El tipo de la actividad es necesaria']
    },
    date: {
        type: String,
        required: [true, 'La fecha de la actividad es necesaria']
    },
    description: {
        type: String,
        required: [true, 'La descripcion de la actividad es necesaria']
    },
    start_time: {
        type: String,
        required: [true, 'La fecha y hora de inicio de la actividad es necesaria']
    },
    end_time: {
        type: String,
        required: [true, 'La fecha y hora final de la actividad es necesaria']
    },
    classroom: {
        type: String,
        required: [true, 'El aula de la actividad es necesaria']
    },
    block_campus: {
        type: String,
        required: [true, 'el nombre del bloque del aula de la actividad es necesaria']
    },
    status: {
        type: Boolean,
        default: true
    },
});

module.exports = mongoose.model('Activity', activitySchema);