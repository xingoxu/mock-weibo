/**
 * Created by xingo on 2016/12/11.
 */

var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');

router.get('/', (req, res, next) => {
    res.render('backend-index.html');
});
router.get('/weiboSearch', (req, res, next) => {
    res.render('backend-weibo-search.html');
});
router.get('/userSearch', (req, res, next) => {
    res.render('backend-user-search.html');
});
router.get('/weibos', (req, res, next) => {
    var keywords = req.query.keywords,
        seq = req.query.seq,
        condition = req.query.condition, //weiboID keywords
        start = Number.parseInt(req.query.start),
        end = Number.parseInt(req.query.end);
    controller.backendSearchWeibo(keywords, seq, condition, start, end)
        .then((weibos) => {
            if (!weibos)
                res.json([]);
            else
                res.json(weibos);
        });
});
router.get('/users', (req, res, next) => {
    var promise;
    if (req.query.condition == "keywords")
        promise = controller.backendSearchUsers(req.query.keywords)
    else
        promise = controller.getUserCardByID(Number.parseInt(req.query.keywords)).then((usercard) => {
            return [usercard]
        });
    promise
        .then((users) => {
            if (!users)
                res.json([]);
            else
                res.json(users);
        })
        .catch(err => {
            console.log(err)
        });
});
router.get('/weibo/:weiboid', (req, res, next) => {
    var weiboid = Number.parseInt(req.params.weiboid);
    var attributes = {};
    var weiboPromise = controller.getSingleWeiboByID(weiboid)
        .then((weibo) => {
            attributes.weibo = weibo;
        });
    var forwardsPromise = controller.forwardWeibos(weiboid)
        .then((data) => {
            if (!data)
                data = [];
            attributes.forwards = data;
        });
    var commentsPromise = controller.getWeiboComments(weiboid)
        .then((data) => {
            if (!data)
                data = [];
            attributes.comments = data;
        });
    Promise.all([forwardsPromise, weiboPromise, commentsPromise])
        .then(() => {
            res.render('backend-single-weibo.html', attributes)
        })
        .catch(err => {
            console.log(err);
            next();
        })
});
router.get('/user/:userid', (req, res, next) => {
    var userid = Number.parseInt(req.params.userid);
    var attributes = {};
    controller.getUserByID(userid)
        .then((data) => {
            attributes.user = data;
        })
        .then(() => {
            res.render('backend-single-user.html', attributes);
        })
        .catch(err => {
            console.log(err);
            next();
        })
});
router.post('/forbidUser', (req, res, next) => {
    controller.setUserForbid(req.body)
        .then(() => {
            res.json({
                success: true
            })
        })
});

router.post('/hotTopic', (req, res, next) => {
    controller.setHotTopic(req.body.topic)
        .then(() => {
            res.json({
                success: true
            });
        });
});

router.get('/hotTopic', (req, res, next) => {
    var attributes = {};
    controller.getHotTopic()
        .then((hotTopic) => {
            attributes.hotTopic = hotTopic;
        })
        .then(() => {
            res.render('backend-hot-topic.html', attributes);
        })
});
router.get('/spamReport', (req, res, next) => {
    var attributes = {};
    controller.getSpamsUnread()
        .then((data) => {
            attributes.spams = data;
        })
        .then(() => {
            res.render('backend-spam-report.html', attributes);
        })
});
router.post('/processSpam', (req, res, next) => {
    controller.setSpamRead(req.body.spamid)
        .then(() => {
            res.json({
                success: true,
            })
        })
});

module.exports = router;