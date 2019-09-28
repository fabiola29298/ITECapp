/*
ACCIONES PARA LOS TIPOS DE assist
admin: add,read, update, delete
user: read, update feedback 
invited: -
*/
const express = require('express');
const _ = require('underscore');
const Assist = require('../models/assist');
//const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();

// ===========================
//  Obtener 
// ===========================
app.get('/assist/all', (req, res) => {

    Assist.find({ status: true })
        .populate('person', '_id name  last_name email')
        .populate('assistcontrol', '_id activity person name_staff name_activity')
        .exec((err, assistDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!assistDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'ID no existe'
                    }
                });
            }

            res.json({
                ok: true,
                assist: assistDB
            });

        });

});
// POST para crear registros
app.post('/assist', function(req, res) {
    let body = req.body;

    let assist = new Assist({
        assistcontrol: body.assistcontrol,
        person: body.person,
        date_time: body.date_time

    });
    assist.save((err, assistDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            assist: assistDB
        });
    });
});

// ===========================
//  Actualizar feedback
// ===========================
app.put('/assist/feedback/:id', (req, res) => {
    //let id = req.usuario._id;
    let id = req.params.id;
    let body = req.body;
    let feedbackNew = {
        feedback: body.feedback
    }
    Assist.findByIdAndUpdate(id, feedbackNew, (err, assistDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!assistDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            assist: assistDB
        });


    });


});
//DELETE cambiar de status a false
app.delete('/assist/:id', function(req, res) {
    let id = req.params.id;

    let cambiaStatus = {
        status: false
    }

    Assist.findByIdAndUpdate(id, cambiaStatus, { new: true }, (err, assistDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!assistDelete) {
            return res, status(400).json({
                ok: false,
                err: {
                    message: 'Assist no encontrada'

                }
            });
        }

        res.json({
            ok: true,
            assist: assistDelete
        });
    });
});

// ===========================
//  Buscar por id person y id control
// ===========================
app.get('/assist/buscar/pc/:idperson/:idassistcontrol', (req, res) => {

    let person = req.params.idperson;
    let assistcontrol = req.params.idassistcontrol;
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    //let regex = new RegExp(termino, 'i');

    Assist.find({ person: person, assistcontrol: assistcontrol, status: true })
        .populate('person', '_id name last_name degree description url_image career ')
        .populate('assistcontrol', '_id activity person name_staff  name_activity ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    vacio: true,
                    err
                });
            }

            res.json({
                ok: true,
                assist: activityDB
            })

        })


});
// ===========================
//  Buscar por  id control
// ===========================
app.get('/assist/buscar/c/:idassistcontrol', (req, res) => {

    let assistcontrol = req.params.idassistcontrol;
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    //let regex = new RegExp(termino, 'i');

    Assist.find({ assistcontrol: assistcontrol, status: true })
        .populate('person', '_id name last_name degree description url_image career ')
        .populate('assistcontrol', '_id activity person name_staff  name_activity ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    vacio: true,
                    err
                });
            }

            res.json({
                ok: true,
                assist: activityDB
            })

        })


});
// ===========================
//  Buscar por  id person
// ===========================
app.get('/assist/buscar/p/:idperson', (req, res) => {

    let person = req.params.idperson;
    // creando expresion regular, y 'i' para no afectar cuando usas mayusculas
    //let regex = new RegExp(termino, 'i');

    Assist.find({ person: person, status: true })
        .populate('person', '_id name last_name degree description url_image career ')
        .populate('assistcontrol', '_id activity person name_staff  name_activity ')
        .exec((err, activityDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    vacio: true,
                    err
                });
            }

            if (activityDB == null || activityDB == []) {
                res.json({
                    ok: true,
                    vacio: true
                })
            }

            res.json({
                ok: true,
                assist: activityDB
            })

        })


});
module.exports = app;