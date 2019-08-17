require('../config/config');

const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const Person = require('../models/person');
const app = express();



app.post('/login', (req, res) => {

    let body = req.body;

    Person.findOne({ email: body.email }, (err, personDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!personDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contrasena incorrectos'
                }
            });
        }
        // identificar si la contra hace match con el db

        if (!bcrypt.compareSync(body.password, personDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contrasena) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: personDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: personDB,
            token
        });

    });


});



module.exports = app;