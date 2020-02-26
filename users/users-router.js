const express = require('express')
const UsersModel = require('./users-model')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')
const router = express()
const bcrypt = require('bcryptjs')
router.use(express.json())


router.get('/users',  (req, res) => {
    UsersModel.getUsers()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'there was an issue retrieving users'})
    })
})

router.post('/register',  (req, res) => {
    const data = req.body
    const hash = bcrypt.hashSync(data.password, 12)
    data.password = hash
    
    UsersModel.registerUser(data)
    
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({message: 'error registering new user'})
    })
})


router.post('/login', (req, res) => {
    const{username, password} = req.body
    console.log({username})
    UsersModel.login({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {

            const token = generateToken(user)

            res.status(200).json({token})
        } else {
            res.status(401).json({message: 'invalid creds'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'error'})
    })

})


router.delete('/users/:id', (req, res) => { 
    const id = req.params.id
    UsersModel.remove({id})
    .then( user => {
        res.status(200).json({user})
    })
    .catch(err => {
        res.status(500).json({message: 'error'})
    })
}) 

function generateToken(user) {
    const payload = {
        userId: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}





module.exports = router