var { expressjwt: jwt } = require("express-jwt");

function authJwt(){
    const secret = process.env.SECRET
    console.log(secret)
    return jwt({
        secret:secret,
        algorithms:["HS256"]
    })
}

module.exports = authJwt
