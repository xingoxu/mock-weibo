/**
 * Created by xingo on 2016/12/08.
 */
/**
 * Created by xingo on 2016/12/07.
 */
var curryPromise = require('./curryPromise');

var SQLQuotes = {
        newWeibo: 'INSERT INTO weibo (userid,text,time) VALUES (?,?,?)',
        newForward: 'INSERT INTO weibo (userid,text,time,forward_weiboid) VALUES (?,?,?,?)',
        newSpam: 'INSERT INTO spam (userid,weiboid,text) VALUES (?,?,?)',
        newComment: 'INSERT INTO comments (userid,text,time,weiboid,target_userid) VALUES (?,?,?,?,?)',
        newCommentOnOther: 'INSERT INTO comments (userid,text,time,weiboid,comment_commentid,target_userid) VALUES (?,?,?,?,?,?)',
        at: 'INSERT INTO at (userid,weiboid,target_userid,time) VALUES (?,?,?,?)',
        getLikeCountWeibo: 'SELECT count(*) as count FROM `like` WHERE weiboid=?',
        getLikeCountComment: 'SELECT count(*) as count FROM `like` WHERE commentid=?',
        getForwardCount: 'SELECT count(*) as count FROM weibo WHERE forward_weiboid=?',
        getCommentCount: 'SELECT count(*) as count FROM comments WHERE weiboid=?',
        getSingleWeibo: 'SELECT * FROM weibo WHERE weiboid=?',
        getSingleComment: 'SELECT * FROM comments WHERE commentid=?',
        getWeiboComments: 'SELECT * FROM comments WHERE weiboid=? order by time+0 desc',
        getTimeLine: 'SELECT * from weibo WHERE userid IN ',
        getUserTimeline: 'SELECT * FROM weibo WHERE userid=? order by time+0 desc',
        getFavouriteWeiboIDs: 'SELECT * from favourite WHERE userid=?',
        getLikeWeiboIDs: 'SELECT * FROM `like` WHERE userid=?',
        getAtWeiboIDs: 'SELECT * FROM at WHERE target_userid=?',
        getWeiboInID: 'SELECT * from weibo WHERE weiboid IN ',
        getForwardWeibos: 'SELECT * from weibo WHERE forward_weiboid=?',
        commentPageComments: 'SELECT * FROM comments WHERE target_userid=?',
        likePageLikes: 'SELECT * FROM `like` WHERE target_userid=?',
        getSearchWeibos: 'SELECT * FROM weibo WHERE text like ?  order by time+0 desc',
    },
    weiboOperation = {
        newWeibo: curryPromise(SQLQuotes.newWeibo),
        newForward: curryPromise(SQLQuotes.newForward),
        at: curryPromise(SQLQuotes.at),
        getLikeCountWeibo: curryPromise(SQLQuotes.getLikeCountWeibo),
        getLikeCountComment: curryPromise(SQLQuotes.getLikeCountComment),
        getForwardCount: curryPromise(SQLQuotes.getForwardCount),
        getCommentCount: curryPromise(SQLQuotes.getCommentCount),
        getSingleWeibo: curryPromise(SQLQuotes.getSingleWeibo),
        newSpam: curryPromise(SQLQuotes.newSpam),
        getSingleComment: curryPromise(SQLQuotes.getSingleComment),
        getWeiboComments: curryPromise(SQLQuotes.getWeiboComments),
        newComment: curryPromise(SQLQuotes.newComment),
        newCommentOnOther: curryPromise(SQLQuotes.newCommentOnOther),
        getTimeLine(userids){
            var sql = SQLQuotes.getTimeLine + `(${userids.join(',')}) order by time+0 desc`;
            return curryPromise(sql)();
        },
        getUserTimeline: curryPromise(SQLQuotes.getUserTimeline),
        getFavouriteWeiboIDs: curryPromise(SQLQuotes.getFavouriteWeiboIDs),
        getLikeWeiboIDs: curryPromise(SQLQuotes.getLikeWeiboIDs),
        getAtWeiboIDs: curryPromise(SQLQuotes.getAtWeiboIDs),
        getWeiboInID(weiboids){
            var sql = SQLQuotes.getWeiboInID + `(${weiboids.join(',')})`;
            return curryPromise(sql)();
        },
        getForwardWeibos: curryPromise(SQLQuotes.getForwardWeibos),
        commentPageComments: curryPromise(SQLQuotes.commentPageComments),
        likePageLikes: curryPromise(SQLQuotes.likePageLikes),
        getSearchWeibos: curryPromise(SQLQuotes.getSearchWeibos),

    };
module.exports = weiboOperation;