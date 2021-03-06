const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user.js')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {

    //coincide el correo del usuario
    const user = await User.findOne({ email })
    if (!user) {
        return done(null, false, { message: 'no existe el usuario' })
    } else {
        //coincide la contraseña del usuario
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'contraseña incorrecta' })
        }
    }

}))


passport.serializeUser(function(user,done){
    done(null,user.id)
}) 

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        done(err,user)
    })
})
