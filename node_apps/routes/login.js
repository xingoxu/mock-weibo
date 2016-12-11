/**
 * Created by xingo on 2016/12/10.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

router.get('/', (req, res, next)=> {
    res.render('login.html');
});

router.post('/', (req, res, next)=> {
    controller.login(req.body.username, req.body.password)
        .then((data)=> {
            if (data.success) {
                req.session.userid = data.id;
            }
            res.json(data);
        });
});

module.exports = router;