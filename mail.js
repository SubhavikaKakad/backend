const express = require('express');

const router = express.Router();

router.get('/get_user',(req,res)=>{
    res.json(
        {
         "name":"Subhavika K",
         "age":"19",
         "email":"subhavikakakad6@gmail.com"
        }
    )
})

router.post('/register',(req,res)=>{

    let user = req.body;

    console.log(user)

    res.json({
        "msg":"Registration Successful."
    })
})

module.exports = router