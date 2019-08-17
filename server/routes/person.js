/*
ACCIONES PARA LOS TIPOS DE USUARIOS
admin: read - get
user: create - post
invited: create - post
*/

const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Person = require('../models/person');
const app = express();

let salto = bcrypt.genSaltSync(10);
// GET para mostrar
app.get('/person', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Person.find({ status: true })
        .skip(desde)
        .limit(limite)
        .exec((err, persons) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //regresar el objeto
            Person.count({ status: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    persons,
                    cuantos: conteo
                });
            });



        });
});
// POST para crear registros
app.post('/person', function(req, res) {
    let body = req.body;

    let person = new Person({
        password: bcrypt.hashSync(body.password, salto),
        name: body.name,
        last_name: body.last_name,
        email: body.email,
        degree: body.degree,
        description: body.description,
        url_image: body.url_image,
        type_inscription: body.type_inscription,
        career: body.career,
        gender: body.gender,
        role: body.role
    });

    person.save((err, personDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // no devolver el password como request
        personDB.password = null;
        res.json({
            ok: true,
            person: personDB
        });
    });
});

module.exports = app;