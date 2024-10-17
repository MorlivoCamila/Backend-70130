const passport = require('passport')

const passportCall = strategy => {    

    return (req, res, next) => {
  
        passport.authenticate(strategy, function(err, user, info){         

            if(err) return next(err)
            
            if(!user) return res.status(401).send({
                error: info.message ? info.message : info.toString()
            })


            req.user = user

            console.log(res);
            

            next()
        }) (req, res, next)
    }
}

module.exports = passportCall