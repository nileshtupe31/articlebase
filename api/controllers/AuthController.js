/**
	 * AuthController
	 *
	 * @description :: Server-side actions for handling incoming requests.
	 * @help        :: See https://sailsjs.com/docs/concepts/actions
	 */
	const passport = require('passport');
	module.exports = {
		//Login function
		login: function(req, res) {
			passport.authenticate('local', function(err, user, info){
				if((err) || (!user)) return res.send({ message: info.message, user});
				
				req.login(user, function(err) {
					if(err) res.send(err);
					return res.send(user);
				});
			})(req, res);
		},
		//Logout function
		logout: function(req, res) {
			req.logout();
			res.send({success:true});
		},
		//Register function
		register: function(req, res){
			//TODO: form validation here
			data = {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				description: req.body.description
			}
			User.create(data).fetch().exec(function(err, user){
				if (err) return res.negoiate(err);

				//TODO: Maybe send confirmation email to the user before login
				req.login(user, function(err){
					if (err) return res.negotiate(err);
					sails.log('User '+ user.id +' has logged in.');
					return res.send(user);
				})
			})
		}
	};
