/*
ACCIONES PARA LOS TIPOS DE USUARIOS
admin: read, create - post, put
user: read
invited: read
*/
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Sponsor = require('../models/sponsor');
const app = express();
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let salto = bcrypt.genSaltSync(10);
// GET para mostrar
app.get('/sponsor', verificaToken, function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Sponsor.find({ status: true })
        .skip(desde)
        .limit(limite)
        .exec((err, sponsor1) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //regresar el objeto
            Sponsor.count({ status: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    sponsor1,
                    cuantos: conteo
                });
            });



        });
});
// POST para crear registros
app.post('/sponsor', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let sponsor1 = new Sponsor({
        name: body.name,
        description: body.description,
        url_website: body.url_website,
        url_image: body.url_image,
    });

    sponsor1.save((err, sponsorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sponsors: sponsorDB
        });
    });
});
module.exports = app;