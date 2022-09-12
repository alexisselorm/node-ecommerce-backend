const express = require('express');
const router = express.Router()
const {User} = require('../../models/users/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.get('/',async (req,res)=>{
    const users = await User.find().select('-passwordHash')
    if (!users) {
        res.status(500).json({success:false})    
    }
    res.send(users)
})

router.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('-passwordHash')
    if (!user) {
      return res.status(400).json({success:false})    
    }
        res.status(200).send(user)
  
})

router.post('/login', async (req,res)=>{
    const user = await User.findOne({email:req.body.email})
    const secret = process.env.SECRET

    if(!user) return res.status(400).send("The user is not found")

   
    if (user && bcrypt.compareSync(req.body.password,user.passwordHash)) {
        const token = jwt.sign({
            userId: user.id,
            isAdmin: user.isAdmin
        },secret,
        {expiresIn:'10h'})
        res.status(200).send({user:user.email,token})
    }else{
        res.status(400).send('Wrong password')  
    }
})

router.post('/register',async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,    
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        isAdmin: req.body.isAdmin
       
    })
    user = await user.save()

    if(!user) return res.status(500).json({success: false})
    res.status(201).send(user)

})

module.exports=router