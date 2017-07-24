const jwt = require('jwt-simple')
const moment = require('moment')
const SECRET_TOKEN = 'shh'

function createToken(usuario){
    const payload = {
        sub: usuario.idUsuario,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, SECRET_TOKEN)
}

function decodeToken(token){
    const decoded = new Promise( (resolve, reject) => {
        try {
            const payload = jwt.decode(token, SECRET_TOKEN)
            if (payload.exp <= moment().unix()) {
                resolve({
                    status: 401,
                    mensaje: 'el token ha expirado'
                })
            }

            resolve(payload.sub)
        } catch (err) {
            reject({
                status: 500,
                mensaje: 'invalid token'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}