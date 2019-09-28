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

const { verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();

let salto = bcrypt.genSaltSync(10);
// GET para mostrar
app.get('/person', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 30;
    limite = Number(limite);

    Person.find({ status: true })
        .skip(desde)
        .limit(limite)
        .exec((err, person) => {
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
                    person,
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
// ===========================
//  Buscar por nombre de speakers
// ===========================
app.get('/person/buscar/speaker', (req, res) => {

    let termino = 'speaker';
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    //let regex = new RegExp(termino, 'i');

    Person.find({ type_inscription: termino })
        .populate('person', '_id name last_name degree description url_image career ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                person: activityDB
            })

        })


});

// ===========================
//  Mostrar Staff 
// ===========================
app.get('/person/staff', (req, res) => {

    let termino = 'ADMIN_ROLE';
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    //let regex = new RegExp(termino, 'i');

    Person.find({ role: termino })
        .populate('person', '_id name last_name degree description url_image career ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                person: activityDB
            })

        })


});

// ===========================
//  Buscar por id
// ===========================
app.get('/person/buscar/id/:id', (req, res) => {

    let termino = req.params.id;
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    //let regex = new RegExp(termino, 'i');

    Person.find({ _id: termino })
        .populate('person', '_id name last_name degree description url_image career ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                person: activityDB
            })

        })


});


// ===========================
//  Buscar por nombre de participantes
// ===========================
app.get('/person/buscar/nombre/:termino', (req, res) => {

    let termino = req.params.termino;
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    let regex = new RegExp(termino, 'i');

    Person.find({ name: regex, last_name: regex })
        .populate('person', '_id name last_name degree description url_image career ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }


            res.json({
                ok: true,
                person: activityDB
            })

        })


});

module.exports = app;