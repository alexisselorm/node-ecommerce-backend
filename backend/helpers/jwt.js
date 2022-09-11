var { expressjwt: jwt } = require("express-jwt");

function authJwt(){
    const secret = process.env.SECRET
    const api = process.env.API_URL
    console.log(secret)
   return jwt({
        secret:secret,
        algorithms:["HS256"]
    }).unless({
        path:[
            
         {url:'/\/api\/v1\/products(.*)',methods:['GET','OPTIONS']},
        `${api}/users/login`,
        // `${api}/products`,
        `${api}users/register`
    ]
    });
}

module.exports = authJwt
