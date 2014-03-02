var q = require('q');
var ObjectId = require('mongoskin').ObjectID;
var i = require('../i');
var agenda = i.agenda();
var sites = i.db().sites;
var jobs = i.db().agendaJobs;
var activity = i.db().activity;

module.exports={
	addSite: function(req){
		req.sanitize('keyword').trim();
        req.sanitize('description').trim();
        req.sanitize('time').trim();
        req.sanitize('importance').trim();
		
		return q.fcall(function () {
            var errors = req.validationErrors();
            if (errors) {
                return q.reject(errors);
            } else {
                return req.body;
            }
        }).then(function(body){
        	return i.userService().getById(req.session.userId).then(function(user){
	        	return i.siteService().getByUsername(user.username).then(function(userSites){
	        		console.log(userSites);
	        		if(user.subscription == null || user.subscription.state != 'active'){ 
	        				console.log('adding');
	        				body.username = user.username;
	        				return q.nbind(sites.addSite, sites)(body);	        			
	        		}
	        	});
        	});
        	
        });
	},
	
	deleteSite: function(id){
		return q.fcall(function () {
        	return q.nbind(sites.remove, sites)({_id:ObjectId(id)});
        });
	},
	
	getSiteByUrlAndAccount: function(url, account){
		return q.nbind(sites.getByUrlAndAccount, sites)(url, account);
	},
	
	getByUsername: function(username){
		console.log("getByUsername:::" + username);
		return q.nbind(sites.getByUsername, sites)(username);
	},
	getActivity: function(username){
		return q.nbind(activity.getByUsername, activity)(username);
	}
}