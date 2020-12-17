const router = require('express').Router()
const authToken = require('../middleware/auth')

//router.use(authToken)

router.get('/list', (req, res)=>{
    const id = req.userId
    return res.json({error:'return'})
})

module.exports = router