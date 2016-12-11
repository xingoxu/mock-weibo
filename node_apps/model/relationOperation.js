/**
 * Created by xingo on 2016/12/09.
 */
var curryPromise = require('./curryPromise');

var SQLQuotes = {
        follow: 'INSERT INTO follow (userid,followingid,time) VALUES (?,?,?)',
        cancelFollow: 'DELETE FROM follow WHERE userid=? AND followingid=?',
        favourite: 'INSERT INTO favourite (userid,weiboid,time) VALUES (?,?,?)',
        cancelFavourite: 'DELETE FROM favourite WHERE userid=? AND weiboid=?',
        newWeiboLike: 'INSERT INTO `like` (userid,weiboid,time,target_userid) VALUES (?,?,?,?)',
        newCommentLike: 'INSERT INTO `like` (userid,commentid,time,target_userid) VALUES (?,?,?,?)',
        cancelWeiboLike: 'DELETE FROM `like` WHERE userid=? AND weiboid=?',
        cancelCommentLike: 'DELETE FROM `like` WHERE userid=? AND commentid=?',
        getFavourited: 'SELECT count(*) as count FROM favourite WHERE weiboid=? AND userid=?',
        getWeiboLiked: 'SELECT count(*) as count FROM `like` WHERE weiboid=? AND userid=?',
        getCommentLiked: 'SELECT count(*) as count FROM `like` WHERE commentid=? AND userid=?',
        getAtUnReadCount: 'SELECT count(*) as count FROM at WHERE hasRead=0 AND userid=?',
        getCommentUnReadCount: 'SELECT count(*) as count FROM comments WHERE hasRead=0 AND target_userid=?',
        getLikeUnReadCount: 'SELECT count(*) as count FROM `like` WHERE hasRead=0 AND target_userid=?',
        setAtHasRead: 'UPDATE at SET hasRead=1 WHERE target_userid=?',
        setCommentHasRead: 'UPDATE comments SET hasRead=1 WHERE target_userid=?',
        setLikeHasRead: 'UPDATE `like` SET hasRead=1 WHERE target_userid=?',
        getFollowed: 'SELECT count(*) as count FROM follow WHERE userid=? AND followingid=?',
    },
    relationOperation = {
        follow: curryPromise(SQLQuotes.follow),
        cancelFollow: curryPromise(SQLQuotes.cancelFollow),
        favourite: curryPromise(SQLQuotes.favourite),
        cancelFavourite: curryPromise(SQLQuotes.cancelFavourite),
        newWeiboLike: curryPromise(SQLQuotes.newWeiboLike),
        newCommentLike: curryPromise(SQLQuotes.newCommentLike),
        cancelWeiboLike: curryPromise(SQLQuotes.cancelWeiboLike),
        cancelCommentLike: curryPromise(SQLQuotes.cancelCommentLike),
        getFavourited: curryPromise(SQLQuotes.getFavourited),
        getWeiboLiked: curryPromise(SQLQuotes.getWeiboLiked),
        getCommentLiked: curryPromise(SQLQuotes.getCommentLiked),
        getAtUnReadCount: curryPromise(SQLQuotes.getAtUnReadCount),
        getCommentUnReadCount: curryPromise(SQLQuotes.getCommentUnReadCount),
        getLikeUnReadCount: curryPromise(SQLQuotes.getLikeUnReadCount),
        setAtHasRead: curryPromise(SQLQuotes.setAtHasRead),
        setCommentHasRead: curryPromise(SQLQuotes.setCommentHasRead),
        setLikeHasRead: curryPromise(SQLQuotes.setLikeHasRead),
        getFollowed: curryPromise(SQLQuotes.getFollowed),
    };
module.exports = relationOperation;