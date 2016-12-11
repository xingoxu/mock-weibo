/**
 * Created by xingo on 2016/12/07.
 */
var userOperation = require('../model/userOperation.js');
var weiboOperation = require('../model/weiboOperation.js');
var relationOperation = require('../model/relationOperation.js');
var successObject = {
    success: true,
};

function getUser(result) {
    if (!result || result.length <= 0)
        return null;
    var userRow = result[0],
        user = {};
    user.userid = userRow.userid;
    user.username = userRow.username;
    user.intro = userRow.intro;
    user.avatar = userRow.avatar;
    user.area = userRow.area;
    user.birthday = userRow.birthday;
    user.mail = userRow.mail;
    return user;
}
function getNumber(result) {
    if (!result || result.length <= 0)
        return 0;
    return result[0].count;
}
function getUserCard(user) {
    if (!user) return null;
    var userCard = {};
    userCard.userid = user.userid;
    userCard.username = user.username;
    userCard.intro = user.intro;
    userCard.avatar = user.avatar;
    return userOperation.getFansNumber(userCard.userid)
        .then((result) => {
            userCard.fans = getNumber(result);
            return userOperation.getFollowNumber(userCard.userid);
        })
        .then((result) => {
            userCard.following = getNumber(result);
            return userOperation.getWeiboNumber(userCard.userid);
        })
        .then((result) => {
            userCard.weibo = getNumber(result);
            return userCard;
        });
}
function getUserByID(userid) {
    return userOperation.getUserByID(userid).then(getUser);
}
function getUserByName(username) {
    return userOperation.getUserByName(username).then(getUser);
}
function getUserCardByID(userid) {
    return getUserByID(userid).then(getUserCard);
}
function getUserCardByName(username) {
    return getUserByName(username).then(getUserCard);
}
function register(username, password, email) {
    return getUserByName(username)
        .then((user) => {
            if (user)
                return {
                    success: false,
                    reason: '用户名已存在'
                };
            return userOperation.register(username, password, email)
                .then((result) => {
                    return {
                        success: true,
                        id: result.insertId
                    };
                });
        });
}
function login(username, password) {
    return getUserByName(username)
        .then((user) => {
            if (!user)
                return Promise.resolve({
                    success: false,
                    reason: '没有此用户',
                });
            return userOperation.getUserByID(user.userid)
                .then((result) => {
                    if (result[0].password != password)
                        return Promise.resolve({
                            success: false,
                            reason: '密码错误',
                        });
                    return Promise.resolve({
                        success: true,
                        id: result[0].userid,
                    })
                })
        })
}

function getLikeCount(weiboid, isComment) {
    var promise;
    if (isComment)
        promise = weiboOperation.getLikeCountComment(weiboid);
    else
        promise = weiboOperation.getLikeCountWeibo(weiboid);
    return promise.then(getNumber);
}
function getForwardCount(weiboid) {
    return weiboOperation.getForwardCount(weiboid).then(getNumber);
}
function getCommentCount(weiboid) {
    return weiboOperation.getCommentCount(weiboid).then(getNumber);
}

function getSingleWeibo(result) {
    if (!result || result.length == 0)
        return null;
    var weiboUserid = result[0].userid;
    var weibo = {
        weiboid: result[0].weiboid,
        text: result[0].text,
        forward_weiboid: result[0].forward_weiboid,
        time: result[0].time,
    };
    var promise = getUserCardByID(weiboUserid)
        .then((usercard) => {
            weibo.user = usercard;
            return getLikeCount(weibo.weiboid, false);
        })
        .then((number) => {
            weibo.like = number;
            return getCommentCount(weibo.weiboid);
        })
        .then((number) => {
            weibo.comment = number;
            return getForwardCount(weibo.weiboid);
        })
        .then((number) => {
            weibo.forward = number;
            return weibo;
        });
    if (weibo.forward_weiboid)
        promise.then(() => {
            return getSingleWeiboByID(weibo.weiboid);
        })
            .then((forwardWeibo) => {
                weibo.forwardWeibo = forwardWeibo;
                return weibo;
            });
    return promise;
}
function getSingleWeiboByID(id) {
    return weiboOperation.getSingleWeibo(id).then(getSingleWeibo);
}

function getSingleWeibos(result) {
    if (!result || result.length == 0)
        return null;
    var weibos = [];
    var promises = [];
    for (var i = 0; i < result.length; i++) {
        var weiboUserid = result[i].userid;
        var weibo = {
            weiboid: result[i].weiboid,
            text: result[i].text,
            forward_weiboid: result[i].forward_weiboid,
            time: result[i].time,
        };
        var promise = (function (weibo, weiboUserid) {
            return getUserCardByID(weiboUserid)
                .then((user) => {
                    weibo.user = user;
                    return getLikeCount(weibo.weiboid, false);
                })
                .then((number) => {
                    weibo.like = number;
                    return getCommentCount(weibo.weiboid);
                })
                .then((number) => {
                    weibo.comment = number;
                    return getForwardCount(weibo.weiboid);
                })
                .then((number) => {
                    weibo.forward = number;
                    if (weibo.forward_weiboid) {
                        return getSingleWeiboByID(weibo.forward_weiboid)
                            .then((forwardWeibo) => {
                                weibo.forwardWeibo = forwardWeibo;
                            })
                    }
                    else
                        return weibo;
                });
        })(weibo, weiboUserid);
        weibos.push(weibo);
        promises.push(promise);
    }
    return Promise.all(promises)
        .then(() => {
            return weibos;
        });
}

function newWeibo(weibo) {
    var promise;
    if (weibo.forward_weiboid == 0) {
        promise = weiboOperation.newWeibo(weibo.user.userid, weibo.text, weibo.time);
    }
    else {
        promise = weiboOperation.newForward(weibo.user.userid, weibo.text, weibo.time, weibo.forward_weiboid);
    }
    return promise.then((result) => {
        if (weibo.ats && weibo.ats.length > 0) {
            atPeoples(weibo.ats, weibo.user.userid, result.insertId, weibo.time);
        }
        return {
            success: true,
            id: result.insertId
        }
    })
}
function newSpam(spam) {
    return weiboOperation.newSpam(spam.user.userid, spam.weiboid, spam.text)
        .then(() => {
            return {
                success: true,
                id: result.insertId
            };
        })
}
function newComment(comment) {
    var promise;
    if (comment.comment_commentid) {
        promise = getSingleCommentByID(comment.comment_commentid)
            .then((comment_comment) => {
                return weiboOperation.newCommentOnOther(comment.user.userid, comment.text, comment.time, comment.weiboid, comment.comment_commentid, comment_comment.user.userid);
            });
    }
    else {
        promise = getSingleWeiboByID(comment.weiboid)
            .then((weibo) => {
                return weiboOperation.newComment(comment.user.userid, comment.text, comment.time, comment.weiboid, weibo.user.userid);
            });
    }
    return promise
        .then((result) => {
            if (comment.ats && comment.ats.length > 0) {
                atPeoples(comment.ats, comment.user.userid, result.insertId, comment.time);
            }
            return {
                success: true,
                id: result.insertId
            };
        });
}
function getSingleComment(result) {
    if (!result || result.length == 0)
        return null;
    var comment = {
        commentid: result[0].commentid,
        weiboid: result[0].weiboid,
        text: result[0].text,
        time: result[0].time,
        comment_commentid: result[0].comment_commentid,
    };
    var userCardPromise = getUserCardByID(result[0].userid)
        .then((usercard) => {
            comment.user = usercard;
        });
    var likeCountPromise = getLikeCount(comment.commentid, true)
        .then((number) => {
            comment.like = number;
        });
    return Promise.all([userCardPromise, likeCountPromise])
        .then(() => {
            return comment;
        });
}
function getSingleCommentByID(commentid) {
    return weiboOperation.getSingleComment(commentid).then(getSingleComment)
}
function getSingleComments(result) {
    if (!result || result.length == 0)
        return null;
    var comments = [];
    var promises = [];
    for (var i = 0; i < result.length; i++) {
        var weiboUserid = result[i].userid;
        var comment = {
            commentid: result[i].commentid,
            weiboid: result[i].weiboid,
            text: result[i].text,
            comment_commentid: result[i].comment_commentid,
            time: result[i].time,
        };
        var promise = (function (comment, weiboUserid) {
            return getUserCardByID(weiboUserid)
                .then((user) => {
                    comment.user = user;
                    return getLikeCount(comment.commentid, true);
                })
                .then((number) => {
                    comment.like = number;
                    return comment;
                })
        })(comment, weiboUserid);
        comments.push(comment);
        promises.push(promise);
    }
    return Promise.all(promises)
        .then(() => {
            return comments;
        });
}
function getWeiboComments(weiboid) {
    return weiboOperation.getWeiboComments(weiboid).then(getSingleComments);
}

function follow(request) {
    return relationOperation.follow(request.userid, request.target_userid, request.time)
        .then(() => {
            return successObject
        });
}
function cancelFollow(request) {
    return relationOperation.cancelFollow(request.userid, request.target_userid)
        .then(() => {
            return successObject
        });
}
function removeFollower(request) {
    return relationOperation.cancelFollow(request.target_userid, request.userid)
        .then(() => {
            return successObject
        });
}

function favourite(request) {
    return relationOperation.favourite(request.userid, request.weiboid, request.time)
        .then(() => {
            return successObject
        });
}
function cancelFavourite(request) {
    return relationOperation.cancelFavourite(request.userid, request.weiboid)
        .then(() => {
            return successObject
        });
}

function newLike(request) {
    var promise;
    if (request.weiboid) {
        promise = getSingleWeiboByID(request.weiboid)
            .then((weibo) => {
                return relationOperation.newWeiboLike(request.userid, request.weiboid, request.time, weibo.user.userid);
            })
    }
    else {
        promise = getSingleCommentByID(request.commentid)
            .then((comment) => {
                return relationOperation.newCommentLike(request.userid, request.commentid, request.time, comment.user.userid);
            })
    }
    return promise.then(() => {
        return successObject;
    })
}

function cancelLike(request) {
    var promise;
    if (request.weiboid)
        promise = relationOperation.cancelWeiboLike(request.userid, request.weiboid);
    else
        promise = relationOperation.cancelCommentLike(request.userid, request.commentid);
    return promise.then(() => {
        return successObject
    });
}

function atOne(userid, weiboid, username, time) {
    return getUserByName(username)
        .then((user) => {
            if (!user)
                return Promise.reject();
            return weiboOperation.at(userid, weiboid, user.userid, time);
        })
}

function atPeoples(atsName, userid, weiboid, time) {
    for (var i = 0; i < atsName.length; i++) {
        atOne(userid, weiboid, atsName[i], time);
    }
}

function getFavourited(userid, weiboid) {
    return relationOperation.getFavourited(weiboid, userid).then(getNumber).then((number) => {
        return number > 0
    });
}
function getLiked(userid, id, isComment) {
    var promise;
    if (isComment)
        promise = relationOperation.getCommentLiked(id, userid);
    else
        promise = relationOperation.getWeiboLiked(id, userid);
    return promise.then(getNumber).then((number) => {
        return number > 0
    });
}

function getUserFollowingIDs(userid) {
    return userOperation.getUserFollowingIDs(userid)
        .then((result) => {
            var users = [];
            for (var i = 0; i < result.length; i++) {
                users.push(result[i].followingid);
            }
            return users;
        });
}
function indexTimeline(userid) {
    return getUserFollowingIDs(userid)
        .then((userids) => {
            return weiboOperation.getTimeLine(userids).then(getSingleWeibos);
        })
        .then((weibos) => {
            var promises = [];
            for (var i = 0; i < weibos.length; i++) {
                var favouritePromise = (function (weibo) {
                    return getFavourited(userid, weibo.weiboid)
                        .then((isFavourited) => {
                            weibo.favourited = isFavourited;
                        });
                })(weibos[i]);
                var likePromise = (function (weibo) {
                    return getLiked(userid, weibo.weiboid, false)
                        .then((isLiked) => {
                            weibo.liked = isLiked;
                        });
                })(weibos[i]);
                promises.push(favouritePromise);
                promises.push(likePromise);
            }
            return Promise.all(promises).then(() => {
                return weibos;
            });
        })
}

function getUserNotificationNumber(userid) {
    var notification = {};
    var atPromise = relationOperation.getAtUnReadCount(userid).then(getNumber)
        .then((number) => {
            notification.at = number;
        });
    var commentPromise = relationOperation.getCommentUnReadCount(userid).then(getNumber)
        .then((number) => {
            notification.comments = number;
        });
    var likePromise = relationOperation.getLikeUnReadCount(userid).then(getNumber)
        .then((number) => {
            notification.like = number;
        });
    return Promise.all([atPromise, commentPromise, likePromise])
        .then(() => {
            return notification;
        })
}
function userTimeline(userid, login_userid) {
    return weiboOperation.getUserTimeline(userid)
        .then(getSingleWeibos)
        .then((weibos) => {
            var promises = [];
            for (var i = 0; i < weibos.length; i++) {
                var favouritePromise = (function (weibo) {
                    return getFavourited(login_userid, weibo.weiboid)
                        .then((isFavourited) => {
                            weibo.favourited = isFavourited;
                        });
                })(weibos[i]);
                var likePromise = (function (weibo) {
                    return getLiked(login_userid, weibo.weiboid, false)
                        .then((isLiked) => {
                            weibo.liked = isLiked;
                        });
                })(weibos[i]);
                promises.push(favouritePromise);
                promises.push(likePromise);
            }
            return Promise.all(promises).then(() => {
                return weibos;
            });
        })
}

function favouriteTimeline(userid) {
    return weiboOperation.getFavouriteWeiboIDs(userid)
        .then((result) => {
            var weiboids = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].weiboid)
                    weiboids.push(result[i].weiboid);
            }
            return weiboOperation.getWeiboInID(weiboids);
        })
        .then(getSingleWeibos)
        .then((weibos) => {
            var promises = [];
            for (var i = 0; i < weibos.length; i++) {
                weibos[i].favourited = true;
                var likePromise = (function (weibo) {
                    return getLiked(userid, weibo.weiboid, false)
                        .then((isLiked) => {
                            weibo.liked = isLiked;
                        });
                })(weibos[i]);
                promises.push(likePromise);
            }
            return Promise.all(promises).then(() => {
                return weibos;
            });
        })
}

function likeTimeline(userid) {
    return weiboOperation.getLikeWeiboIDs(userid)
        .then((result) => {
            var weiboids = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].weiboid)
                    weiboids.push(result[i].weiboid);
            }
            return weiboOperation.getWeiboInID(weiboids);
        })
        .then(getSingleWeibos)
        .then((weibos) => {
            var promises = [];
            for (var i = 0; i < weibos.length; i++) {
                var favouritePromise = (function (weibo) {
                    return getFavourited(userid, weibo.weiboid)
                        .then((isFavourited) => {
                            weibo.favourited = isFavourited;
                        });
                })(weibos[i]);
                weibos[i].liked = true;
                promises.push(favouritePromise);
            }
            return Promise.all(promises).then(() => {
                return weibos;
            });
        })
}

function setAtHasRead(userid) {
    return relationOperation.setAtHasRead(userid);
}
function setCommentHasRead(userid) {
    return relationOperation.setCommentHasRead(userid);
}
function setLikeHasRead(userid) {
    return relationOperation.setLikeHasRead(userid);
}

function setRelation(userid, usercard) {
    if (!usercard)
        return Promise.resolve(usercard);
    var followPromise = relationOperation.getFollowed(userid, usercard.userid).then(getNumber)
        .then((number) => {
            usercard.followed = number > 0;
        });
    var beFollowedPromise = relationOperation.getFollowed(usercard.userid, userid).then(getNumber)
        .then((number) => {
            usercard.beFollowed = number > 0;
        });
    return Promise.all([followPromise, beFollowedPromise]).then(() => {
        return usercard;
    });
}

function atTimeline(userid) {
    return weiboOperation.getAtWeiboIDs(userid)
        .then((result) => {
            var weiboids = [];
            for (var i = 0; i < result.length; i++) {
                if (result[i].weiboid)
                    weiboids.push(result[i].weiboid);
            }
            return weiboOperation.getWeiboInID(weiboids);
        })
        .then(getSingleWeibos)
        .then((weibos) => {
            var promises = [];
            for (var i = 0; i < weibos.length; i++) {
                var favouritePromise = (function (weibo) {
                    return getFavourited(userid, weibo.weiboid)
                        .then((isFavourited) => {
                            weibo.favourited = isFavourited;
                        });
                })(weibos[i]);
                var likePromise = (function (weibo) {
                    return getLiked(userid, weibo.weiboid, false)
                        .then((isLiked) => {
                            weibo.liked = isLiked;
                        });
                })(weibos[i]);
                promises.push(likePromise);
                promises.push(favouritePromise);
            }
            return Promise.all(promises).then(() => {
                return weibos;
            });
        })
}

function forwardWeibos(weiboid) {
    return weiboOperation.getForwardWeibos(weiboid).then(getSingleWeibos)
}

function commentPageComments(userid) {
    return weiboOperation.commentPageComments(userid)
        .then((result) => {
            var comments = [];
            var promises = [];
            for (var i = 0; i < result.length; i++) {
                var comment = {
                    text: result[i].text,
                    time: result[i].time,
                    commentid: result[i].commentid,
                };
                var userPromise = (function (comment) {
                    return getUserCardByID(result[i].userid)
                        .then((usercard) => {
                            comment.user = usercard;
                        })
                })(comment);
                var commentPromise;
                if (result[i].comment_commentid) {
                    commentPromise = (function (comment, commentid) {
                        return getSingleCommentByID(commentid).then((commentResult) => {
                            comment.comment = commentResult;
                        });
                    })(comment, result[i].comment_commentid);
                }
                else {
                    commentPromise = (function (comment, weiboid) {
                        return getSingleWeiboByID(weiboid).then((weibo) => {
                            comment.weibo = weibo;
                        });
                    })(comment, result[i].weiboid);
                }
                promises.push(userPromise);
                promises.push(commentPromise);
                comments.push(comment);
            }
            return Promise.all(promises)
                .then(() => {
                    return comments;
                });
        })
}

function likePageLikes(userid) {
    return weiboOperation.likePageLikes(userid)
        .then((result) => {
            var likes = [];
            var promises = [];
            for (var i = 0; i < result.length; i++) {
                var like = {
                    time: result[i].time,
                    likeid: result[i].likeid,
                };
                var userPromise = (function (like) {
                    return getUserCardByID(result[i].userid)
                        .then((usercard) => {
                            like.user = usercard;
                        })
                })(like);
                var commentPromise;
                if (result[i].commentid) {
                    commentPromise = (function (like, commentid) {
                        return getSingleCommentByID(commentid).then((commentResult) => {
                            like.comment = commentResult;
                        });
                    })(like, result[i].commentid);
                }
                else {
                    commentPromise = (function (like, weiboid) {
                        return getSingleWeiboByID(weiboid).then((weibo) => {
                            like.weibo = weibo;
                        });
                    })(like, result[i].weiboid);
                }
                promises.push(userPromise);
                promises.push(commentPromise);
                likes.push(like);
            }
            return Promise.all(promises)
                .then(() => {
                    return likes;
                });
        })
}

function getFollowingUsers(userid) {
    return userOperation.getUserFollowingIDs(userid)
        .then((result) => {
            var usercards = [];
            var promise = Promise.resolve();
            for (var i = 0; i < result.length; i++) {
                (function (result) {
                    promise = promise.then(() => {
                        return getUserCardByID(result.followingid).then((usercard) => {
                            usercards.push(usercard);
                            return setRelation(userid, usercard);
                        });
                    });
                })(result[i]);
            }
            promise = promise.then(() => {
                return usercards;
            });
            return promise;
        })
}

function getFollowerusers(userid) {
    return userOperation.getFollowerUsers(userid)
        .then((result) => {
            var usercards = [];
            var promise = Promise.resolve();
            for (var i = 0; i < result.length; i++) {
                (function (result) {
                    promise = promise.then(() => {
                        return getUserCardByID(result.userid).then((usercard) => {
                            usercards.push(usercard);
                            return setRelation(userid, usercard);
                        });
                    });
                })(result[i]);
            }
            promise = promise.then(() => {
                return usercards;
            });
            return promise;
        })
}
function getSearchWeibos(keyword, userid) {
    return weiboOperation.getSearchWeibos(`%${keyword}%`)
        .then(getSingleWeibos)
        .then((weibos) => {
            if (!weibos)
                return null;
            var promises = [];
            for (var i = 0; i < weibos.length; i++) {
                var favouritePromise = (function (weibo) {
                    return getFavourited(userid, weibo.weiboid)
                        .then((isFavourited) => {
                            weibo.favourited = isFavourited;
                        });
                })(weibos[i]);
                var likePromise = (function (weibo) {
                    return getLiked(userid, weibo.weiboid, false)
                        .then((isLiked) => {
                            weibo.liked = isLiked;
                        });
                })(weibos[i]);
                promises.push(favouritePromise);
                promises.push(likePromise);
            }
            return Promise.all(promises).then(() => {
                return weibos;
            });
        })
}

function getSearchUsers(keywords, userid) {
    return userOperation.getSearchUsers(`%${keywords}%`)
        .then((result) => {
            var usercards = [];
            var promise = Promise.resolve();
            for (var i = 0; i < result.length; i++) {
                (function (result) {
                    promise = promise.then(() => {
                        return getUserCardByID(result.userid).then((usercard) => {
                            usercards.push(usercard);
                            return setRelation(userid, usercard);
                        });
                    });
                })(result[i]);
            }
            promise = promise.then(() => {
                return usercards;
            });
            return promise;
        })
}
function updateUser(user) {
    return userOperation.updateUser(user.username, user.intro, user.area, user.birthday, user.mail, user.userid);
}
function updatePassword(userid, password) {
    return userOperation.updatePassword(password, userid);
}
function deleteWeibo(weiboid) {
    return userOperation.deleteWeibo(weiboid);
}
function updateAvatar(userid, url) {
    return userOperation.updateAvatar(url, userid);
}

module.exports = {
    getUserByID,
    getUserByName,
    getUserCardByID,
    getUserCardByName,
    login,
    register,
    likeTimeline,
    getUserNotificationNumber,
    newLike,
    cancelLike,
    indexTimeline,
    updatePassword,
    getSingleWeiboByID,
    newSpam,
    userTimeline,
    setRelation,
    updateAvatar,
    favouriteTimeline,
    favourite,
    cancelFavourite,
    updateUser,
    getFavourited,
    getLiked,
    newWeibo,
    deleteWeibo,
    newComment,
    follow,
    cancelFollow,
    removeFollower,
    forwardWeibos,
    getWeiboComments,
    setAtHasRead,
    setCommentHasRead,
    setLikeHasRead,
    getFollowerusers,
    getFollowingUsers,
    atTimeline,
    commentPageComments,
    likePageLikes,
    getSearchUsers,
    getSearchWeibos
};