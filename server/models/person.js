const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// esquemas de mogoose
let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'INVITED_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let personSchema = new Schema({
    password: {
        type: String,
        required: [true, 'la contrasena es obligatoria']
    },
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    last_name: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    degree: {
        type: String,
        required: false,

    },
    description: {
        type: String,
        required: false
    },
    url_image: {
        type: String,
        required: false
    },
    type_inscription: {
        type: String,
        required: false
    },
    career: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

personSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
personSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Person', personSchema);