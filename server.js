var app = require('express')(); 
var Configurator = require('./configurator');

app.get('/:project.:format', function(req, res){
    Configurator.find({
         project: req.params.project, 
         format: req.params.format
    }, function(config){
         res.send(config); 
    });
});

app.get('/:project', function(req, res){
    Configurator.find({
         project: req.params.project, 
         format: 'json'
    }, function(config){
         res.send(config); 
    }); 
});

app.put('/:project/:key/:value', function(req,res){
    Configurator.set({
        project: req.params.project, 
        key:     req.params.key, 
        value:   req.params.value
    }, function(status){
        res.send(status); 
    }); 
}); 

app.get('/', function(req,res){
    if( Configurator.isAllowed(req.ip) )
        return res.send(''); 
        
    res.send(req.ip); 
}); 

app.listen(8000); 