var Datastore = require('nedb'); 
var projects  = new Datastore({filename: 'projects.db', autoload: true}); 

module.exports = {
    
    allowedHosts: [
        'localhost', 
        '127.0.0.1', 
        '0.0.0.0'
    ], 

    isAllowed: function(ip){
        return this.allowedHosts.indexOf(ip) == -1; 
    },
    
    set: function(record, callback){
        projects.insert(record, function(err, newDoc){
            if( err ) 
                return callback('could not save record'); 
        
            callback('data saved'); 
            
        }); 
    }, 
    
    find: function(req, callback){
        var self = this; 
        projects.find({project: req.project}, function(err, data){

            if( err || ! data.length ) 
                return callback(null);             
            
            var config = {}; 
             
            data.map(function(record){
                config[record.key] = record.value; 
            }); 
            
            callback( self.format(config, req.format) ); 
            
        });
    }, 
    
    format: function(data, format){
    
        switch (format) {
            case 'json':
                return JSON.stringify(data); 
            case 'env':
                return this.generateEnvVars(data); 
            default:
                return null; 
        }
    }, 
    
    generateEnvVars: function(data){
        var envVars = []; 
        for(var parameter in data){
            envVars.push([parameter, data[parameter]].join('=')); 
        }
            
        return envVars.join(' '); 
    } 
    
}; 