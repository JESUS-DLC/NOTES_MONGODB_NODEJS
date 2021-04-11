const usersController ={}

const passport = require('passport')

const User = require('../models/user.js')

usersController.renderSignUpForm = function(req, res){
    res.render('users/signup')
}

usersController.signup = async function(req,res){
    const errors =[];
    const {name,email,password,confirm_password}=req.body;
    if(password != confirm_password){
        errors.push({text:'las contraseñas no coinciden'})
    }
    if(password.length<5){
        errors.push({text:'la contraseña debe tener mas de 5 caracteres'})
    }
    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            name,
            email
        })
    }else{
      const emailUser = await User.findOne({email:email});
       if(emailUser){
            req.flash('delete_msg','el correo que ingresaste ya esta en uso')
            res.redirect('/users/signup');
       }else{
           const newUser = new User({name,email,password})
           newUser.password =  await newUser.encryptPassword(password)
           await newUser.save();
           req.flash('success_msg','el usuario ha sido registrado correctamente')
           res.redirect('/users/signin')
       }
    }
}

usersController.renderSignInForm =function(req,res){
    res.render('users/signin')
}

usersController.signin =passport.authenticate('local',{
        failureRedirect:'/users/signin',
        successRedirect:'/notes',
        failureFlash:true
})


usersController.logout = function(req,res){
    req.logout();
    req.flash('success_msg','cerraste sesion')
    res.redirect('/users/signin')
}


module.exports = usersController;