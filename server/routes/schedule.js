/*
ACCIONES PARA LOS TIPOS DE schedules
admin: -
user: add,read id, delete 
invited: read
*/
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Schedule = require('../models/schedule');
//const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

// ===========================
//  Obtener el scedule del usuario
// ===========================
app.get('/schedule/:id', (req, res) => {
    let id = req.params.id;
    Schedule.find({ person: id, status: true })
        .populate('activity', ' _id name type date description start_time end_time classroom block_campus')
        .exec((err, scheduleDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!scheduleDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                schedule: scheduleDB
            });

        });

});
// POST para crear registros
app.post('/schedule', function(req, res) {
    let body = req.body;

    let schedule = new Schedule({
        activity: body.activity,
        person: body.person
    });
    schedule.save((err, scheduleDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            schedule: scheduleDB
        });
    });
});
//DELETE cambiar de status a false
app.delete('/schedule/:id', function(req, res) {
    let id = req.params.id;

    let cambiaStatus = {
        status: false
    }

    Schedule.findOneAndUpdate(id, cambiaStatus, { new: true }, (err, scheduleDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!scheduleDelete) {
            return res, status(400).json({
                ok: false,
                err: {
                    message: 'Schedule no encontrada'

                }
            });
        }

        res.json({
            ok: true,
            schedule: scheduleDelete
        });
    });
});
// ===========================
//  Buscar por fecha
// ===========================
app.get('/schedule/buscar/date/:date', (req, res) => {

    let termino = req.params.date;
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    let regex = new RegExp(termino, 'i');

    Schedule.find({ 'activity.date': regex })
        .sort('date ASC')
        .exec((err, scheduleDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                schedule: scheduleDB
            })

        })


});

module.exports = app;