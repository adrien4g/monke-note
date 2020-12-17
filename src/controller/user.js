const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {sign, decode} = require('../jwt')

const User = mongoose.model('User')
const Key = mongoose.model('Key')

module.exports = {

  async logIn(req, res) {
    const { email, password } = req.headers
    try {
      const user = await User.findOne({email}).select('+password')
      //Verify if user exists
      if (!user) return res.json({error:'User not found.'})
      //Verify if password is valid
      if (!await bcrypt.compare(password, user.password)){
        return res.json({error:'Invalid password.'})
      }
      //Create token
      const token = sign({user:user.id})
      user.password = undefined
      return res.send({user, token})

    }catch(err){
      return res.send(err)
    }
  },

  async newUser(req, res) {
    const {email, key} = req.body
    try {
      if (await User.findOne({email})) return res.send({error:'User already exists!'})

      const keyExist = await Key.findOne({key})
      if (!keyExist) return res.json({keyError:'Invalid key'})
      if (keyExist.used == true) res.json({keyError:'Key already used!'})
      
      const newUser = await User.create(req.body)
      keyExist.used = true
      keyExist.save()
      
      const token = sign({user:newUser.id})
      newUser.password = undefined
      return res.json({newUser, token})

    } catch (err) {
      return res.send(err)
    }
  }
}
