const express = require('express');

const app=express();

app.get('/', (req, res) => {
    console.log("hello from express");
    res.status(200);
    res.json({message:"Hello from express"})
});


module.exports=app;


