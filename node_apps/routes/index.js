var express = require('express');
var router = express.Router();
var controller = require('../controller/controller');
var userid = 1;

/* GET home page. */
router.get('/', function (req, res, next) {
    var userid = Number.parseInt(req.session.userid);
    if (!userid) {
        res.redirect('/login');
        return;
    }
    var attributes = {};
    var timelinePromise = controller.indexTimeline(userid)
        .then((data) => {
            attributes.timeline = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([timelinePromise, currentUserPromise, notificationPromise])
        .then(() => {
            res.render('index-page.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/my-like', function (req, res, next) {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var timelinePromise = controller.likeTimeline(userid)
        .then((data) => {
            attributes.timeline = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([timelinePromise, currentUserPromise, notificationPromise])
        .then(() => {
            res.render('my-like.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/like', (req, res, next) => {
    controller.newLike(req.body)
        .then(() => {
            res.json({
                success: true
            })
        });
});
router.post('/like/delete', (req, res, next) => {
    controller.cancelLike(req.body)
        .then(() => {
            res.json({
                success: true
            })
        });
});

router.get('/password', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([currentUserPromise, notificationPromise])
        .then(() => {
            res.render('changePassword.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});
router.post('/password', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.updatePassword(userid, req.body.password)
        .then(() => {
            res.json({
                success: true
            })
        });
});
router.get('/logout', (req, res, next) => {
    req.session.userid = null;
    res.redirect('/login');
});

router.get('/report/:weiboid', (req, res, next) => {
    var weiboid = Number.parseInt(req.params.weiboid);
    var attributes = {};
    var weiboPromise = controller.getSingleWeiboByID(weiboid)
        .then((data) => {
            attributes.weibo = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    Promise.all([currentUserPromise, weiboPromise])
        .then(() => {
            res.render('report-spam.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});
router.post('/report', (req, res, next) => {
    controller.newSpam(req.body)
        .then(() => {
            res.json({
                success: true
            })
        });
});

router.post('/avatar', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var path = req.files.uploaded_file.path;
    var index = path.lastIndexOf('\\');
    path = path.substr(index + 1);
    controller.updateAvatar(userid, `/avatars/${path}`)
        .then(() => {
            res.json({
                success: true
            })
        });
});
router.get('/user/:id', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var target_userid = Number.parseInt(req.params.id);
    var attributes = {};
    var targetUserCardPromise = controller.getUserCardByID(target_userid)
        .then((usercard) => {
            return controller.setRelation(userid, usercard).then(() => {
                return usercard
            });
        })
        .then((usercard) => {
            attributes.targetUserCard = usercard;
        });
    var targetUserPromise = controller.getUserByID(target_userid)
        .then(user => {
            if (!user)
                return Promise.reject(404);
            attributes.targetUser = user;
        });
    var timelinePromise = controller.userTimeline(target_userid, userid)
        .then((data) => {
            attributes.timeline = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([currentUserPromise, notificationPromise, targetUserCardPromise, targetUserPromise, timelinePromise])
        .then(() => {
            res.render('personalPage.html', attributes)
        })
        .catch(err => {
            console.log(err);
            next();
        })
});
router.get('/user/name/:name', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.getUserByName(decodeURIComponent(req.params.name))
        .then(user => {
            if (!user)
                return Promise.reject(404)
            else
                res.redirect('/user/' + user.userid);
        })
        .catch(() => {
            next();
        })
});

router.get('/favourite', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var timelinePromise = controller.favouriteTimeline(userid)
        .then((data) => {
            attributes.timeline = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([timelinePromise, currentUserPromise, notificationPromise])
        .then(() => {
            res.render('my-favourite.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});
router.post('/favourite', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.favourite(req.body)
        .then(() => {
            res.json({
                success: true,
            })
        });
});
router.post('/favourite/delete', (req, res, next) => {
    controller.cancelFavourite(req.body)
        .then(() => {
            res.json({
                success: true,
            })
        });
});
router.get('/profile', (req, res) => {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var fullUserPromise = controller.getUserByID(userid)
        .then((data) => {
            attributes.fullUserData = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([fullUserPromise, currentUserPromise, notificationPromise])
        .then(() => {
            res.render('profile.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});
router.post('/profile', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.updateUser(req.body)
        .then(() => {
            res.json({
                success: true
            })
        })
});

router.get('/weibo/:weiboid', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var weiboid = Number.parseInt(req.params.weiboid);
    var attributes = {};
    var weiboPromise = controller.getSingleWeiboByID(weiboid)
        .then((weibo) => {
            attributes.weibo = weibo;
            var favouritePromise = controller.getFavourited(userid, weibo.weiboid)
                .then((isFavourited) => {
                    weibo.favourited = isFavourited;
                });
            var likePromise = controller.getLiked(userid, weibo.weiboid, false)
                .then((isLiked) => {
                    weibo.liked = isLiked;
                });
            return Promise.all([favouritePromise, likePromise]);
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([currentUserPromise, weiboPromise, notificationPromise])
        .then(() => {
            res.render('singleWeibo.html', attributes)
        })
        .catch(err => {
            console.log(err);
            next();
        })
});

router.post('/weibo', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.newWeibo(req.body)
        .then((data) => {
            res.json(data)
        })
});

router.delete('/weibo/:weiboid', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var weiboid = Number.parseInt(req.params.weiboid);
    controller.deleteWeibo(weiboid)
        .then(() => {
            res.json({
                success: true
            })
        })
});

router.post('/comment', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.newComment(req.body)
        .then((commentid) => {
            res.json({
                success: true,
                id: commentid,
            })
        })
});

router.get('/comments/:weiboid', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var weiboid = Number.parseInt(req.params.weiboid);
    controller.getWeiboComments(weiboid)
        .then((comments) => {
            if (!comments)
                return comments;
            var promises = [];
            for (var i = 0; i < comments.length; i++) {
                var likePromise = (function (comment) {
                    return controller.getLiked(userid, comment.commentid, true)
                        .then((isLiked) => {
                            comment.liked = isLiked;
                        });
                })(comments[i]);
                promises.push(likePromise);
            }
            return Promise.all(promises).then(() => {
                return comments;
            });
        })
        .then((comments) => {
            if (comments)
                res.json({
                    comments: comments,
                    total: comments.length
                });
            else
                res.json(null);
        });
});

router.get('/forwards/:weiboid', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var weiboid = Number.parseInt(req.params.weiboid);
    controller.forwardWeibos(weiboid)
        .then((weibos) => {
            if (weibos)
                res.json({
                    forwards: weibos,
                    total: weibos.length
                });
            else
                res.json(null);
        })
});

router.get('/userCard/id/:userid', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var target_userid = Number.parseInt(req.params.userid);
    controller.getUserCardByID(target_userid)
        .then((usercard) => {
            return controller.setRelation(userid, usercard).then(() => {
                return usercard
            });
        })
        .then((usercard) => {
            res.json(usercard);
        });
});
router.get('/userCard/name/:username', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.getUserCardByName(decodeURIComponent(req.params.username))
        .then((usercard) => {
            return controller.setRelation(userid, usercard).then(() => {
                return usercard
            });
        })
        .then((usercard) => {
            res.json(usercard);
        });
});


router.post('/follow', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.follow(req.body)
        .then(() => {
            res.json({
                success: true,
            })
        })
});
router.post('/follow/delete', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.cancelFollow(req.body)
        .then(() => {
            res.json({
                success: true,
            })
        })
});
router.post('/follower/delete', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    controller.removeFollower(req.body)
        .then(() => {
            res.json({
                success: true,
            })
        })
});
router.get('/user/:id/follow', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var target_userid = Number.parseInt(req.params.id);
    var attributes = {};
    var usersPromise = controller.getFollowingUsers(target_userid)
        .then(users => {
            attributes.users = users;
        });
    var targetUserCardPromise = controller.getUserCardByID(target_userid)
        .then((usercard) => {
            return controller.setRelation(userid, usercard).then(() => {
                return usercard
            });
        })
        .then((usercard) => {
            attributes.targetUserCard = usercard;
        });
    var targetUserPromise = controller.getUserByID(target_userid)
        .then(user => {
            if (!user)
                return Promise.reject(404);
            attributes.targetUser = user;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([currentUserPromise, notificationPromise, targetUserCardPromise, targetUserPromise, usersPromise])
        .then(() => {
            res.render('following.html', attributes)
        })
        .catch(err => {
            console.log(err);
            next();
        })
});
router.get('/user/:id/fans', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var target_userid = Number.parseInt(req.params.id);
    var attributes = {};
    var usersPromise = controller.getFollowerusers(target_userid)
        .then(users => {
            attributes.users = users;
        });
    var targetUserCardPromise = controller.getUserCardByID(target_userid)
        .then((usercard) => {
            return controller.setRelation(userid, usercard).then(() => {
                return usercard
            });
        })
        .then((usercard) => {
            attributes.targetUserCard = usercard;
        });
    var targetUserPromise = controller.getUserByID(target_userid)
        .then(user => {
            if (!user)
                return Promise.reject(404);
            attributes.targetUser = user;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });
    Promise.all([currentUserPromise, notificationPromise, targetUserCardPromise, targetUserPromise, usersPromise])
        .then(() => {
            res.render('following.html', attributes)
        })
        .catch(err => {
            console.log(err);
            next();
        })
});

router.get('/at', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var timelinePromise = controller.atTimeline(userid)
        .then((data) => {
            attributes.timeline = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });

    Promise.all([timelinePromise, currentUserPromise])
        .then(() => {
            return controller.setAtHasRead(userid);
        })
        .then(() => {
            return controller.getUserNotificationNumber(userid)
                .then((data) => {
                    attributes.notification = data;
                });
        })
        .then(() => {
            res.render('at.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/comment', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var commentsPromise = controller.commentPageComments(userid)
        .then((data) => {
            attributes.comments = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });

    Promise.all([commentsPromise, currentUserPromise])
        .then(() => {
            return controller.setCommentHasRead(userid);
        })
        .then(() => {
            return controller.getUserNotificationNumber(userid)
                .then((data) => {
                    attributes.notification = data;
                });
        })
        .then(() => {
            res.render('comment.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});
router.get('/like', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var attributes = {};
    var likesPromise = controller.likePageLikes(userid)
        .then((data) => {
            attributes.likes = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });

    Promise.all([likesPromise, currentUserPromise])
        .then(() => {
            return controller.setLikeHasRead(userid);
        })
        .then(() => {
            return controller.getUserNotificationNumber(userid)
                .then((data) => {
                    attributes.notification = data;
                });
        })
        .then(() => {
            res.render('like.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/search', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var keywords = req.query.keywords;
    var attributes = {
        keywords: keywords
    };
    var timelinePromise = controller.getSearchWeibos(keywords, userid)
        .then((data) => {
            attributes.timeline = data;
        });
    var usersPromise = controller.getSearchUsers(keywords, userid)
        .then((data) => {
            attributes.users = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });

    Promise.all([timelinePromise, usersPromise, currentUserPromise, notificationPromise])
        .then(() => {
            res.render('search.html', attributes)
        })
        .catch((err) => {
            console.log(err);
        })
});
router.get('/search/user', (req, res, next) => {
    var userid = Number.parseInt(req.session.userid);
    var keywords = req.query.keywords;
    var attributes = {
        keywords: keywords
    };
    var usersPromise = controller.getSearchUsers(keywords, userid)
        .then((data) => {
            attributes.users = data;
        });
    var currentUserPromise = controller.getUserCardByID(userid)
        .then((data) => {
            attributes.currentUser = data;
        });
    var notificationPromise = controller.getUserNotificationNumber(userid)
        .then((data) => {
            attributes.notification = data;
        });

    Promise.all([usersPromise, currentUserPromise, notificationPromise])
        .then(() => {
            res.render('searchUser.html', attributes)
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;
