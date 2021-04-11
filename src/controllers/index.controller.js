const controller ={}

 controller.renderIndex = function(req,res){
    res.render('./partials/index')
}

controller.renderAbout = function(req,res){
    res.render('./partials/about') 
}

module.exports = controller;