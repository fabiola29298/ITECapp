/*
ACCIONES PARA LOS TIPOS DE assist control
admin: add,read, delete
user: - 
invited: read
*/

const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Control = require('../models/assist_control');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

// ===========================
//  Obtener  
// ===========================
app.get('/control', [verificaToken, verificaAdmin_Role], (req, res) => {
    Control.find({ person: req.usuario._id, status: true })
        .populate('activity', 'name type date description start_time end_time classroom block_campus')
        .populate('person', 'name email')
        .exec((err, controlDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!controlDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                control: controlDB
            });

        });

});
// POST para crear registros
app.post('/control', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let control = new Control({
        activity: body.activity,
        person: body.person,
        name_staff: body.name_staff,
        name_activity: body.name_activity
    });

    control.save((err, controlDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            control: controlDB
        });
    });
});


module.exports = app;