const express = require('express');
const router = express.Router()
const {User} = require('../../models/users/user');


router.get('/',async (req,res)=>{
    const users = await User.find()
    if (!users) {
        res.status(500).json({success:false})
        
    }
    res.send(users)
})

router.post('/',(req,res)=>{
    const user = new User({
        image: req.body.image,
        name: req.body.name,
       
    })
    user.save()
    .then((createduser)=>{
        res.status(201).json(createduser)
    })
    .catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports=router