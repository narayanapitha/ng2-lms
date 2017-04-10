var express     = require('express');
var app         = express();
var nodemailer = require('nodemailer');
var Setting = require('../app/models/setting');

/*var smtpTrans = function() {
   Setting.findById("58d39e3d4c5bbb40411de9e2", function(err, setting) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: setting.smtpusername,
                pass: setting.smtppassword
            }
        });
   });
}();

var smtpFromEmailName = function() {
   Setting.findById("58d39e3d4c5bbb40411de9e2", function(err, setting) {
        return setting.smtpfromname+' <' + setting.smtpfromemail + '>';
   });
}();

*/

exports.smtpFromEmailName = function() {
    var data; 
    Setting.findById("58d39e3d4c5bbb40411de9e2", function(err, setting) {
       data = {
            'smtpfromname': setting.smtpfromname,
            'smtpfromemail': setting.smtpfromemail,
            'smtpusername': setting.smtpusername,
            'smtppassword': setting.smtppassword,
        };
    });
    return data;
    
}();

/*module.exports = {
    smtpTrans: smtpTrans,
    smtpFromEmailName: smtpFromEmailName
};*/