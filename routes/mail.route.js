(function() {

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');
    var mongo = require('mongodb');

    var Mail = require('../models/mail.model.js');

    // Handle get request to get all mail resources
    router.get('/', function(req, res, next) {
        var o_id = new mongo.ObjectID(req.query.mailId);
        console.log('handling get /mail in mail.route.js');
        Mail.findOne({ '_id': o_id }, function(err, mail) {
            console.log(mail);
            if (err) {
                next(err);
                return;
            }

            //console.log('returning mail: ', mail);
            res.send(mail);
        });
    });


    // Handle post requests for mail resources
    router.post('/', function(req, res, next) {
        //console.log('handling post /mail', req.body)
        var newMail = new Mail(req.body);

        newMail.save(function(err, mail) {
            if (err) {
                next(err);
                return;
            }

            //console.log('Mail saved successfully: ', mail);
            res.send(mail);
        });
    });

    router.post('/update', function(req, res) {
        var currMail = req.body;
        var o_id = new mongo.ObjectID(req.body._id);
        Mail.update({ '_id': o_id }, {
            sender: currMail.sender,
            recipient: currMail.recipient,
            subject: currMail.subject,
            body: currMail.body,
            read: currMail.read
        }, function(err, numberAffected, rawResponse) {
            console.log(rawResponse);
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                status: 'Update successful!'
            });
        })
    });

    module.exports = router;
})();
