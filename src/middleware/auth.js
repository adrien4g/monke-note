const jwt = require('jsonwebtoken')
const {secret}  = require('../jwt')

module.exports = (req, res, next) =>{
    //get token
    const authHeader = req.headers.autorization

    //Verify if token exists
    if (!authHeader) return res.status(401).json({error:'No token provided'})

    const parts = authHeader.split(' ')

    if (parts.length != 2) return res.status(401).json({error:'Token error'})

    const [scheme, token] = parts

    //Verify if token has 'Bearer' on start
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({error:'Invalid Token format'})

    //Decode token
    jwt.verify(token, secret, (error, decoded) =>{
        if(error) return res.status(401).json({error:'Invalid Token'})

        req.userId = decoded.user
        return next()
    })
}