const jwt = require('jsonwebtoken')

const secret = '78652e5cb51561940a4c55d9fd0b4b30'

const sign = payload => jwt.sign(payload, secret, {expiresIn:86400})
const decode = token => jwt.verify(token, secret)

module.exports = {
    sign,
    decode,
    secret
}