function _first(cb) {
    return function (err, res) {
        cb(err, res && res[0]);
    }
}

module.exports = function (db) {

    db.bind('sites', {
    	getByUrlAndAccount: function(username, cb){
    		this.findOne({username:username}, cb);
    	},
    	
    	getByUsername: function(username, cb){
    		this.findItems({username:username}, cb);
    	},
    	
    	addSite: function(params, cb){
    		this.insert(params, _first(cb));
    	}

    });

};