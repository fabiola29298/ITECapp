/*
ACCIONES PARA LOS TIPOS DE USUARIOS
admin: create, read - get, post
user: read - post
invited: read - post
*/

const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Notifications = require('../models/notification');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

let salto = bcrypt.genSaltSync(10);
// GET para mostrar
app.get('/notification', [verificaToken, verificaAdmin_Role], function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Notifications.find({ status: true })
        .skip(desde)
        .limit(limite)
        .exec((err, notifications1) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //regresar el objeto
            Notifications.count({ status: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    notifications1,
                    cuantos: conteo
                });
            });



        });
});
// POST para crear registros
app.post('/notification', verificaToken, function(req, res) {
    let body = req.body;

    let notifications1 = new Notifications({
        name: body.name,
        description: body.description,
        url_image: body.url_image,
        url_extra: body.url_extra,
        date_time: body.date_time
    });

    notifications1.save((err, notificationsDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            notifications: notificationsDB
        });
    });
});


module.exports = app;