var Leave = require('../models/leave'); // get the mongoose model
var User = require('../models/user');
var mongoose = require('mongoose');
var config = require('../../config/database');
var passport	= require('passport');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var nodemailer = require('nodemailer');
var Setting = require('../models/setting');


exports.sendRegistrationUser = (req, res) => {

    Setting.findById("58d39e3d4c5bbb40411de9e2", function(err, setting) {
        if (err) throw err;

        if (setting) {

            var mailOpts, smtpTrans;

            if (req.body.role == '1') {
                var userRole = 'Admin';
            } else if (req.body.role == '2') {
                var userRole = 'Manager';
            } else {
                var userRole = 'User';
            }

            fs.readFile("app/templates/registration.html", "utf8", function(err, templateHtml) {
                if (err) throw err;

                var mailHtml = templateHtml.replace("$fname", req.body.firstname).replace("$lname", req.body.lastname).replace("$email", req.body.email).replace("$password", req.body.password).replace("$userRole", userRole);

                //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
                smtpTrans = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: setting.smtpusername,
                        pass: setting.smtppassword
                    }
                });
                //Mail options
                mailOpts = {
                    from: 'Leave Management System <' + setting.smtpfromemail + '>',
                    to: req.body.email,
                    subject: 'Registration Confirmation',
                    html: mailHtml
                };

                smtpTrans.sendMail(mailOpts, function(error, response) {
                    //Email not sent
                    if (error) {
                        res.json({
                            success: false,
                            msg: 'Error occured while sending email to user.'
                        });
                    }
                });

            });

        }
    });
};


exports.sendAddLeave = (req, res) => {
    
    Setting.findById("58d39e3d4c5bbb40411de9e2", function(err, setting) {
        if (err) throw err;

        if (setting) {

            var mailOpts, smtpTrans;

            fs.readFile("app/templates/leave.html", "utf8", function(err, templateHtml) {
                if (err) throw err;

                var mailHtml = templateHtml.replace("$fullname", req.body.firstname).replace("$email", req.body.lastname).replace("$reportingmanager", req.body.email).replace("$leavetype", req.body.password).replace("$leaveduration", userRole).replace("$leavedescription", userRole);

                //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
                smtpTrans = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: setting.smtpusername,
                        pass: setting.smtppassword
                    }
                });
                //Mail options
                mailOpts = {
                    from: 'Leave Management System <' + setting.smtpfromemail + '>',
                    to: req.body.email,
                    subject: 'Leave Request',
                    html: mailHtml
                };

                smtpTrans.sendMail(mailOpts, function(error, response) {
                    //Email not sent
                    if (error) {
                        res.json({
                            success: false,
                            msg: 'Error occured while sending email to user.'
                        });
                    }
                });

            });

        }
    });
};