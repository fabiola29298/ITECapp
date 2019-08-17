const jwt = require('jsonwebtoken');
//================
// Verificar Token
//================
let verificaToken = (req, res, next) => {

    let token = req.get('token'); // obtener los headers

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: ' Token no valido',

                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

};
//================
// Verificar admin role
//================
let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {

        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'

            }
        });
    }
};
//================
// Verificar user role
//================
let verificaUser_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'USER_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No es usuario'
            }
        });
    }



};
module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaUser_Role
}