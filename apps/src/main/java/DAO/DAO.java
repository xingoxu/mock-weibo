package DAO;

import com.google.gson.Gson;
import config.mysql;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.*;
import java.util.ArrayList;

import dataObject.*;
import spark.Request;

import javax.servlet.MultipartConfigElement;

/**
 * Created by xingo on 2016/11/28.
 */
public class DAO {
    public static void main(String[] args) {

    }

    public static Connection connection = null;

    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        if (connection == null) {
            Class.forName(mysql.DRIVER_MYSQL);     //加载JDBC驱动
            connection = DriverManager.getConnection(mysql.URL);    //创建数据库连接对象
        }
        return connection;
    }

    public static ResultSet query(String sql) {
        ResultSet result = null;
        try {
            result = getConnection().createStatement().executeQuery(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static int insert(String sql) {
        try {
            Statement statement = getConnection().createStatement();
            statement.executeUpdate(sql, Statement.RETURN_GENERATED_KEYS);
            ResultSet rs = statement.getGeneratedKeys();  //得到新插入记录的自增主键
            rs.next();
            return rs.getInt(1);
        } catch (SQLException e) {
            System.out.println("插入数据库时出错：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("插入时出错：");
            e.printStackTrace();
        }
        return 0;
    }

    public static boolean update(String sql) {
        return delete(sql);
    }

    public static boolean delete(String sql) {
        try {
            Statement statement = getConnection().createStatement();
            statement.executeUpdate(sql);
            return true;
        } catch (SQLException e) {
            System.out.println("插入数据库时出错：");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("插入时出错：");
            e.printStackTrace();
        }
        return false;
    }


    public static User getUser(ResultSet dbResult) {
        if (dbResult == null)
            return null;
        User user = new User();
        try {
            dbResult.next();
            user.userid = dbResult.getInt("userid");
            user.username = dbResult.getString("username") + "";
            user.intro = dbResult.getString("intro") + "";
            user.avatar = dbResult.getString("avatar") + "";
            user.area = dbResult.getString("area") + "";
            user.birthday = dbResult.getString("birthday") + "";
            user.mail = dbResult.getString("mail") + "";
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return user;
    }

    public static User getUser(int userid) {
        String sql = "SELECT * FROM user WHERE userid=" + userid;
        return getUser(query(sql));
    }

    public static User getUser(String name) {
        name = name.replace("'", "\\'");
        String sql = "SELECT * FROM user WHERE username=subString('" + name + "',1)";
        return getUser(query(sql));
    }

    public static UserCard getUserCard(User queryUser) {
        if (queryUser == null)
            return null;

        UserCard user = new UserCard();
        user.userid = queryUser.userid;
        user.username = queryUser.username;
        user.intro = queryUser.intro;
        user.avatar = queryUser.avatar;


        String queryFollow = "SELECT count(*) FROM follow WHERE userid=" + user.userid;
        String queryFans = "SELECT count(*) FROM follow WHERE followingid=" + user.userid;
        String queryWeibo = "SELECT count(*) FROM weibo WHERE userid=" + user.userid;
        try {
            ResultSet followData = query(queryFollow);
            followData.next();
            user.following = followData.getInt(1);
            ResultSet fanData = query(queryFans);
            fanData.next();
            user.fans = fanData.getInt(1);
            ResultSet weiboNumberData = query(queryWeibo);
            weiboNumberData.next();
            user.weibo = weiboNumberData.getInt(1);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return user;
    }

    public static UserCard getUserCard(int userid) {
        return getUserCard(getUser(userid));
    }

    public static UserCard getUserCard(String name) {
        return getUserCard(getUser(name));
    }

    //返回userid
    public static operationResponse register(String json) {
        registerObject registerObject = (new Gson()).fromJson(json, registerObject.class);
        User user = getUser(registerObject.name);
        if (user != null) {
            return new operationResponse(false, "用户名已存在");
        }

        try {
            PreparedStatement statement = getConnection().prepareStatement("INSERT INTO user (username,password,mail) VALUES (?,?,?)");
            statement.setString(1, registerObject.name);
            statement.setString(2, registerObject.password);
            statement.setString(3, registerObject.email);
            statement.executeUpdate();
            ResultSet resultSet = query("select last_insert_id() as userid");
            resultSet.next();
            return new operationResponse(true, resultSet.getInt(1));
        } catch (Exception e) {
            e.printStackTrace();
            return new operationResponse(false, "未知错误");
        }
    }

    //operationResponse
    public static operationResponse login(String name, String password) {
        User user = getUser(name);
        if (user == null)
            return new operationResponse(false, "没有此用户");
        String sql = "SELECT * FROM user WHERE userid=" + user.userid;
        ResultSet resultSet = query(sql);
        try {
            resultSet.next();
            String resultPassword = resultSet.getString("password");
            if (!resultPassword.equals(password))
                return new operationResponse(false, "密码错误");
        } catch (Exception e) {

        }
        return new operationResponse(true, user.userid);
    }

    //返回weiboid
    public static int newWeibo(String json) {
        singleWeibo weibo = (new Gson()).fromJson(json, singleWeibo.class);
        String sql;
        if (weibo.forward_weiboid == 0)
            sql = "INSERT INTO weibo (userid,text,time) VALUES (" + weibo.user.userid + ",'" + weibo.text + "','" + weibo.time + "')";
        else
            sql = "INSERT INTO weibo (userid,text,time,forward_weiboid) VALUES (" + weibo.user.userid + ",'" + weibo.text + "','" + weibo.time + "'," + weibo.forward_weiboid + ")";
        int weiboid = insert(sql);
        if (weibo.ats != null && weibo.ats.length > 0) {
            at(weibo.ats, weibo.user.userid, weiboid, weibo.time);
        }
        return weiboid;
    }

    //返回commentid
    public static int newComment(String json) {
        try {
            singleComment comment = (new Gson()).fromJson(json, singleComment.class);
            int target_userid = 0;
            String sql = null;
            if (comment.comment_commentid == 0) {
                target_userid = getSingleWeibo(comment.weiboid).user.userid;
                sql = "INSERT INTO comments (userid,text,time,weiboid,target_userid) VALUES (" + comment.user.userid + ",'" + comment.text + "','" + comment.time + "'," + comment.weiboid + "," + target_userid + ")";
            } else {
                target_userid = getSingleComment(comment.comment_commentid).user.userid;
                sql = "INSERT INTO comments (userid,text,time,weiboid,comment_commentid,target_userid) VALUES (" + comment.user.userid + ",'" + comment.text + "','" + comment.time + "'," + comment.weiboid + "," + comment.comment_commentid + "," + target_userid + ")";
            }
            int commentid = insert(sql);
            if (comment.ats != null && comment.ats.length > 0) {
                at(comment.ats, comment.user.userid, commentid, comment.time);
            }
            return commentid;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static void newSpam(String json) { //用singleWeibo 数据结构 传入spam所需数据，user为举报人user
        singleWeibo spam = (new Gson()).fromJson(json, singleWeibo.class);
        String sql = "INSERT INTO spam (userid,weiboid,text) VALUES(" + spam.user.userid + "," + spam.weiboid + ",'" + spam.text + "')";
        insert(sql);
    }

    public static void at(int userid, int weiboid, int target_userid, String time) {
        String sql = "INSERT INTO at (userid,weiboid,target_userid,time) VALUES(" + userid + "," + weiboid + "," + target_userid + ",'" + time + "')";
        insert(sql);
    }

    public static void at(int userid, int weiboid, String username, String time) {
        User user = getUser(username);
        if (user == null)
            return;
        at(userid, weiboid, user.userid, time);
    }

    public static void at(String[] ats, int userid, int weiboid, String time) {
        for (int i = 0; i < ats.length; i++) {
            at(userid, weiboid, ats[i], time);
        }
    }

    public static void follow(int userid, int followingid, String time) {
        String sql = "INSERT INTO follow (userid,followingid,time) VALUES(" + userid + "," + followingid + ",'" + time + "')";
        insert(sql);
    }

    public static void follow(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        follow(request.userid, request.target_userid, request.time);
    }

    public static void cancelFollow(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        String sql = "DELETE FROM follow WHERE userid=" + request.userid + " AND followingid=" + request.target_userid;
        delete(sql);
    }

    public static void removeFollower(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        String sql = "DELETE FROM follow WHERE userid=" + request.target_userid + " AND followingid=" + request.userid;
        delete(sql);
    }

    public static void favourite(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        String sql = "INSERT INTO favourite (userid,weiboid,time) VALUES(" + request.userid + "," + request.weiboid + ",'" + request.time + "')";
        insert(sql);
    }

    public static void cancelFavourite(String json) {
        operationRequest request = (new Gson()).fromJson(json, operationRequest.class);
        String sql = "DELETE FROM favourite WHERE userid=" + request.userid + " AND weiboid=" + request.weiboid;
        delete(sql);
    }


    //返回likeid
    public static int newLike(String json) {
        operationRequest like = (new Gson()).fromJson(json, operationRequest.class);
        int target_userid = 0;
        String sql;
        if (like.weiboid != 0) {
            target_userid = getSingleWeibo(like.weiboid).user.userid;
            sql = "INSERT INTO `like` (userid,weiboid,time,target_userid) VALUES (" + like.userid + "," + like.weiboid + ",'" + like.time + "'," + target_userid + ")";
        } else {
            target_userid = getSingleComment(like.commentid).user.userid;
            sql = "INSERT INTO `like` (userid,commentid,time,target_userid) VALUES (" + like.userid + "," + like.commentid + ",'" + like.time + "'," + target_userid + ")";
        }

        return insert(sql);
    }

    public static void cancelLike(String json) {
        operationRequest like = (new Gson()).fromJson(json, operationRequest.class);
        String sql;
        if (like.weiboid != 0)
            sql = "DELETE FROM `like` WHERE userid=" + like.userid + " AND weiboid=" + like.weiboid;
        else
            sql = "DELETE FROM `like` WHERE userid=" + like.userid + " AND commentid=" + like.commentid;

        delete(sql);
    }

    public static singleWeibo[] getSingleWeibos(ResultSet weiboResult) {
        ArrayList<singleWeibo> singleWeiboArrayList = new ArrayList<>(0);
        if (weiboResult == null)
            return null;
        int weiboUserid = 0;
        try {
            while (weiboResult.next()) {
                singleWeibo singleWeibo = new singleWeibo();
                singleWeibo.weiboid = weiboResult.getInt("weiboid");
                singleWeibo.text = weiboResult.getString("text");
                singleWeibo.forward_weiboid = weiboResult.getInt("forward_weiboid");
                singleWeibo.time = weiboResult.getString("time");
                weiboUserid = weiboResult.getInt("userid");
                singleWeibo.user = getUserCard(weiboUserid);
                singleWeibo.like = getLikeCount(singleWeibo.weiboid, false);
                singleWeibo.forward = getForwardCount(singleWeibo.weiboid);
                singleWeibo.comment = getCommentCount(singleWeibo.weiboid);
                if (singleWeibo.forward_weiboid != 0)
                    singleWeibo.forwardWeibo = getSingleWeibo(singleWeibo.forward_weiboid);
                singleWeiboArrayList.add(singleWeibo);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        int length = singleWeiboArrayList.size();
        singleWeibo[] singleWeiboReturn = new singleWeibo[length];
        for (int i = 0; i < length; i++) {
            singleWeiboReturn[i] = singleWeiboArrayList.get(i);
        }
        return singleWeiboReturn;
    }

    public static singleWeibo getSingleWeibo(ResultSet weiboResult) {
        if (weiboResult == null)
            return null;
        singleWeibo singleWeibo = new singleWeibo();
        int weiboUserid = 0;
        try {
            weiboResult.next();
            singleWeibo.weiboid = weiboResult.getInt("weiboid");
            singleWeibo.text = weiboResult.getString("text");
            singleWeibo.forward_weiboid = weiboResult.getInt("forward_weiboid");
            singleWeibo.time = (weiboResult.getString("time"));
            singleWeibo.like = getLikeCount(singleWeibo.weiboid, false);
            singleWeibo.forward = getForwardCount(singleWeibo.weiboid);
            singleWeibo.comment = getCommentCount(singleWeibo.weiboid);
            weiboUserid = weiboResult.getInt("userid");
        } catch (Exception e) {
            return null;
        }
        singleWeibo.user = getUserCard(weiboUserid);
        if (singleWeibo.forward_weiboid != 0)
            singleWeibo.forwardWeibo = getSingleWeibo(singleWeibo.forward_weiboid);
        return singleWeibo;
    }

    public static singleWeibo getSingleWeibo(int weiboid) {
        String sql = "SELECT * FROM weibo WHERE weiboid=" + weiboid;
        return getSingleWeibo(query(sql));
    }

    public static singleComment[] getSingleComments(ResultSet commentResult) {
        if (commentResult == null)
            return null;
        ArrayList<singleComment> singleCommentArrayList = new ArrayList<>(0);

        int weiboUserid = 0;
        try {
            while (commentResult.next()) {
                singleComment singleComment = new singleComment();
                singleComment.commentid = commentResult.getInt("commentid");
                singleComment.weiboid = commentResult.getInt("weiboid");
                singleComment.text = commentResult.getString("text");
                singleComment.time = (commentResult.getString("time"));
                weiboUserid = commentResult.getInt("userid");
                singleComment.comment_commentid = commentResult.getInt("comment_commentid");
                singleComment.like = getLikeCount(singleComment.commentid, true);
                singleComment.user = getUserCard(weiboUserid);
                singleCommentArrayList.add(singleComment);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        int length = singleCommentArrayList.size();
        singleComment[] singleCommentReturn = new singleComment[length];
        for (int i = 0; i < length; i++) {
            singleCommentReturn[i] = singleCommentArrayList.get(i);
        }
        return singleCommentReturn;
    }

    public static singleComment[] getWeiboComments(int weiboid) {
        String sql = "SELECT * FROM comments WHERE weiboid=" + weiboid;
        return getSingleComments(query(sql));
    }

    public static singleComment getSingleComment(ResultSet commentResult) {
        if (commentResult == null)
            return null;
        singleComment singleComment = new singleComment();
        int weiboUserid = 0;
        try {
            commentResult.next();
            singleComment.commentid = commentResult.getInt("commentid");
            singleComment.weiboid = commentResult.getInt("weiboid");
            singleComment.text = commentResult.getString("text");
            singleComment.time = (commentResult.getString("time"));
            weiboUserid = commentResult.getInt("userid");
            singleComment.comment_commentid = commentResult.getInt("comment_commentid");
            singleComment.like = getLikeCount(singleComment.commentid, true);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        singleComment.user = getUserCard(weiboUserid);
        return singleComment;
    }

    public static singleComment getSingleComment(int commentid) {
        String sql = "SELECT * FROM comments WHERE commentid=" + commentid;
        return getSingleComment(query(sql));
    }

    //得到某条微博是否被favourited
    public static boolean getFavourited(int userid, int weiboid) {
        String sql = "SELECT count(*) FROM favourite WHERE weiboid=" + weiboid + " AND userid=" + userid;
        return getCount(query(sql)) > 0;
    }

    //得到某条微博或评论是否被liked了
    public static boolean getLiked(int userid, int id, boolean isComment) {
        String sql = "SELECT count(*) FROM `like` WHERE weiboid=" + id + " AND userid=" + userid;
        if (isComment)
            sql = "SELECT count(*) FROM `like` WHERE commentid=" + id + " AND userid=" + userid;
        return getCount(query(sql)) > 0;
    }

    public static int getCount(ResultSet resultSet) {
        if (resultSet == null)
            return 0;
        try {
            resultSet.next();
            int count = resultSet.getInt(1);
            return count;
        } catch (Exception e) {
        }
        return 0;
    }

    public static int getForwardCount(int weiboid) {
        String sql = "SELECT count(*) FROM weibo WHERE forward_weiboid=" + weiboid;
        return getCount(query(sql));
    }

    public static int getLikeCount(int weiboid, boolean isComment) {
        String sql = "SELECT count(*) FROM `like` WHERE weiboid=" + weiboid;
        if (isComment)
            sql = "SELECT count(*) FROM `like` WHERE commentid=" + weiboid;
        return getCount(query(sql));
    }

    public static int getCommentCount(int weiboid) {
        String sql = "SELECT count(*) FROM comments WHERE weiboid=" + weiboid;
        return getCount(query(sql));
    }

    public static int[] getUserFollowingIDs(int userid) {
        String sql = "SELECT * from follow WHERE userid=" + userid;
        ResultSet resultSet = query(sql);
        ArrayList<Integer> list = new ArrayList<>(0);
        try {
            while (resultSet.next()) {
                list.add(resultSet.getInt("followingid"));
            }
        } catch (Exception e) {

        }
        int length = list.size();
        int[] returnInt = new int[length];
        for (int i = 0; i < length; i++) {
            returnInt[i] = (int) list.get(i);
        }
        return returnInt;
    }

    public static singleWeibo[] indexTimeline(int userid) {
        int[] followingIDs = getUserFollowingIDs(userid);
        String queryid = "";
        for (int i = 0; i < followingIDs.length; i++) {
            queryid += followingIDs[i];
            queryid += ",";
        }
        queryid += userid;
        String sql = "SELECT * from weibo WHERE userid IN(" + queryid + ") order by time+0 desc";
        singleWeibo[] weibos = getSingleWeibos(query(sql));
        for (int i = 0; i < weibos.length; i++) {
            int weiboid = weibos[i].weiboid;
            weibos[i].favourited = getFavourited(userid, weiboid);
            weibos[i].liked = getLiked(userid, weiboid, false);
        }
        return weibos;
    }

    public static notificationNumber getUserNotificationNumber(int userid) {
        notificationNumber notification = new notificationNumber();
        String atSql = "SELECT count(*) from at WHERE hasRead=0 AND userid=" + userid;
        String commentSql = "SELECT count(*) from comments WHERE hasRead=0 AND target_userid=" + userid;
        String likeSql = "SELECT count(*) from `like` WHERE hasRead=0 AND target_userid=" + userid;
        notification.at = getCount(query(atSql));
        notification.comments = getCount(query(commentSql));
        notification.like = getCount(query(likeSql));
        return notification;
    }

    public static singleWeibo[] userTimeline(int userid, int login_userid) {
        String sql = "SELECT * from weibo WHERE userid=" + userid + " order by time+0 desc";

        singleWeibo[] weibos = getSingleWeibos(query(sql));
        for (int i = 0; i < weibos.length; i++) {
            int weiboid = weibos[i].weiboid;
            weibos[i].favourited = getFavourited(login_userid, weiboid);
            weibos[i].liked = getLiked(login_userid, weiboid, false);
        }
        return weibos;
    }

    public static singleWeibo[] favouriteTimeline(int userid) {
        String sql = "SELECT * from favourite WHERE userid=" + userid;
        ResultSet resultSet = query(sql);
        ArrayList<Integer> list = new ArrayList<>(0);
        try {
            while (resultSet.next()) {
                list.add(resultSet.getInt("weiboid"));
            }
        } catch (Exception e) {

        }
        int length = list.size();
        if (length == 0)
            return null;
        String weiboIDs = "";
        for (int i = 0; i < length; i++) {
            weiboIDs += ((int) list.get(i));
            if (i != length - 1)
                weiboIDs += ",";
        }

        String weiboSql = "SELECT * from weibo WHERE weiboid IN (" + weiboIDs + ")";
        singleWeibo[] weibos = getSingleWeibos(query(weiboSql));
        for (int i = 0; i < weibos.length; i++) {
            int weiboid = weibos[i].weiboid;
            weibos[i].favourited = true;
            weibos[i].liked = getLiked(userid, weiboid, false);
        }
        return weibos;
    }

    public static singleWeibo[] likeTimeline(int userid) {
        String sql = "SELECT * from `like` WHERE userid=" + userid;
        ResultSet resultSet = query(sql);
        ArrayList<Integer> list = new ArrayList<>(0);
        try {
            while (resultSet.next()) {
                int weiboid = resultSet.getInt("weiboid");
                if (weiboid == 0)
                    continue;
                list.add(weiboid);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        int length = list.size();
        if (length == 0)
            return null;
        String weiboIDs = "";
        for (int i = 0; i < length; i++) {
            weiboIDs += ((int) list.get(i));
            if (i != length - 1)
                weiboIDs += ",";
        }

        String weiboSql = "SELECT * from weibo WHERE weiboid IN (" + weiboIDs + ")";
        System.out.println(weiboSql);
        singleWeibo[] weibos = getSingleWeibos(query(weiboSql));
        for (int i = 0; i < weibos.length; i++) {
            int weiboid = weibos[i].weiboid;
            weibos[i].favourited = getFavourited(userid, weiboid);
            weibos[i].liked = true;
        }
        return weibos;
    }

    public static void setAtHasRead(int userid) {
        String sql = "UPDATE at SET hasRead=1 WHERE target_userid=" + userid;
        update(sql);
    }

    public static void setCommentHasRead(int userid) {
        String sql = "UPDATE comments SET hasRead=1 WHERE target_userid=" + userid;
        update(sql);
    }

    public static void setLikeHasRead(int userid) {
        String sql = "UPDATE `like` SET hasRead=1 WHERE target_userid=" + userid;
        update(sql);
    }

    public static void setRelation(int userid, UserCard userCard) {
        if (userCard == null) return;
        String followSql = "SELECT count(*) FROM follow WHERE userid=" + userid + " AND followingid=" + userCard.userid;
        String beFollowedSql = "SELECT count(*) FROM follow WHERE userid=" + userCard.userid + " AND followingid=" + userid;
        userCard.followed = getCount(query(followSql)) > 0;
        userCard.beFollowed = getCount(query(beFollowedSql)) > 0;
    }

    public static singleWeibo[] atTimeline(int userid) {
        String sql = "SELECT * from at WHERE target_userid=" + userid;
        ResultSet resultSet = query(sql);
        ArrayList<Integer> list = new ArrayList<>(0);
        try {
            while (resultSet.next()) {
                list.add(resultSet.getInt("weiboid"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        int length = list.size();
        if (length == 0)
            return null;
        String weiboIDs = "";
        for (int i = 0; i < length; i++) {
            weiboIDs += ((int) list.get(i));
            if (i != length - 1)
                weiboIDs += ",";
        }

        String weiboSql = "SELECT * from weibo WHERE weiboid IN (" + weiboIDs + ")";
        singleWeibo[] weibos = getSingleWeibos(query(weiboSql));
        for (int i = 0; i < weibos.length; i++) {
            int weiboid = weibos[i].weiboid;
            weibos[i].favourited = getFavourited(userid, weiboid);
            weibos[i].liked = getLiked(userid, weiboid, false);
        }
        return weibos;
    }

    public static singleWeibo[] forwardWeibos(int weiboid) {
        String sql = "SELECT * from weibo WHERE forward_weiboid=" + weiboid;
        return getSingleWeibos(query(sql));
    }

    public static commentPageComment[] commentPageComments(ResultSet resultSet) {
        ArrayList<commentPageComment> commentPageComments = new ArrayList<>(0);
        if (resultSet == null)
            return null;
        int weiboUserid = 0;
        try {
            while (resultSet.next()) {
                commentPageComment commentPageComment = new commentPageComment();
                commentPageComment.user = getUserCard(resultSet.getInt("userid"));
                commentPageComment.text = resultSet.getString("text");
                commentPageComment.time = resultSet.getString("time");
                commentPageComment.commentid = resultSet.getInt("commentid");

                if (resultSet.getInt("comment_commentid") != 0)
                    commentPageComment.comment = getSingleComment(resultSet.getInt("comment_commentid"));
                else
                    commentPageComment.weibo = getSingleWeibo(resultSet.getInt("weiboid"));
                commentPageComments.add(commentPageComment);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        int length = commentPageComments.size();
        commentPageComment[] commentPageCommentReturn = new commentPageComment[length];
        for (int i = 0; i < length; i++) {
            commentPageCommentReturn[i] = commentPageComments.get(i);
        }
        return commentPageCommentReturn;
    }

    public static commentPageComment[] commentPageComments(int userid) {
        String sql = "SELECT * FROM comments WHERE target_userid=" + userid;
        return commentPageComments(query(sql));
    }

    public static likePageLike[] likePageLikes(ResultSet resultSet) {
        ArrayList<likePageLike> likePageLikes = new ArrayList<>(0);
        if (resultSet == null)
            return null;
        int weiboUserid = 0;
        try {
            while (resultSet.next()) {
                likePageLike likePageLike = new likePageLike();
                likePageLike.likeid = resultSet.getInt("likeid");
                likePageLike.user = getUserCard(resultSet.getInt("userid"));
                likePageLike.time = resultSet.getString("time");

                if (resultSet.getInt("commentid") != 0)
                    likePageLike.comment = getSingleComment(resultSet.getInt("commentid"));
                else
                    likePageLike.weibo = getSingleWeibo(resultSet.getInt("weiboid"));
                likePageLikes.add(likePageLike);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        int length = likePageLikes.size();
        likePageLike[] likePageLikeReturn = new likePageLike[length];
        for (int i = 0; i < length; i++) {
            likePageLikeReturn[i] = likePageLikes.get(i);
        }
        return likePageLikeReturn;
    }

    public static likePageLike[] likePageLikes(int userid) {
        String sql = "SELECT * FROM `like` WHERE target_userid=" + userid;
        return likePageLikes(query(sql));
    }

    public static UserCard[] getFollowingUsers(int userid) {
        String sql = "SELECT * FROM follow WHERE userid=" + userid;
        ResultSet useridResultSet = query(sql);
        ArrayList<Integer> arrayList = new ArrayList<>(0);
        try {
            while (useridResultSet.next()) {
                arrayList.add(useridResultSet.getInt("followingid"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new UserCard[0];
        }
        int length = arrayList.size();
        UserCard[] cards = new UserCard[length];
        for (int i = 0; i < length; i++) {
            cards[i] = getUserCard(arrayList.get(i));
            setRelation(userid, cards[i]);
        }
        return cards;
    }

    public static UserCard[] getFollowerUsers(int userid) {
        String sql = "SELECT * FROM follow WHERE followingid=" + userid;
        ResultSet useridResultSet = query(sql);
        ArrayList<Integer> arrayList = new ArrayList<>(0);
        try {
            while (useridResultSet.next()) {
                arrayList.add(useridResultSet.getInt("userid"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new UserCard[0];
        }
        int length = arrayList.size();
        UserCard[] cards = new UserCard[length];
        for (int i = 0; i < length; i++) {
            cards[i] = getUserCard(arrayList.get(i));
            setRelation(userid, cards[i]);
        }
        return cards;
    }

    public static singleWeibo[] getSearchWeibos(String keyword, int userid) {
        String sql = "SELECT * from weibo WHERE text like '%" + keyword + "%' order by time+0 desc";

        singleWeibo[] weibos = getSingleWeibos(query(sql));
        for (int i = 0; i < weibos.length; i++) {
            int weiboid = weibos[i].weiboid;
            weibos[i].favourited = getFavourited(userid, weiboid);
            weibos[i].liked = getLiked(userid, weiboid, false);
        }
        return weibos;
    }

    public static UserCard[] getSearchUsers(String keywords, int userid) {
        String sql = "SELECT * FROM user WHERE username like '%" + keywords + "%'";
        ResultSet useridResultSet = query(sql);
        ArrayList<Integer> arrayList = new ArrayList<>(0);
        try {
            while (useridResultSet.next()) {
                arrayList.add(useridResultSet.getInt("userid"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new UserCard[0];
        }
        int length = arrayList.size();
        UserCard[] cards = new UserCard[length];
        for (int i = 0; i < length; i++) {
            cards[i] = getUserCard(arrayList.get(i));
            setRelation(userid, cards[i]);
        }
        return cards;
    }

    public static void updateUser(String json) {
        User user = (new Gson()).fromJson(json, User.class);
        String sql = "UPDATE user SET username='" + user.username + "',intro='" + user.intro + "',area='" + user.area + "',birthday='" + user.birthday + "',mail='" + user.mail + "' WHERE userid=" + user.userid;
        update(sql);
    }

    public static void updatePassword(int userid, String password) {
        String sql = "UPDATE user SET password='" + password + "' WHERE userid=" + userid;
        update(sql);
    }

    public static void deleteWeibo(int weiboid) {
        String sql = "DELETE FROM weibo WHERE weiboid=" + weiboid;
        delete(sql);
    }

    public static void updateAvatar(int userid, String url) {
        String sql = "UPDATE user SET avatar='/avatars/" + url + "' WHERE userid=" + userid;
        update(sql);
    }

    public static void compressPic(Request request){
        new Thread(()->{
            request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("/temp"));

            try (InputStream input = request.raw().getPart("uploaded_file").getInputStream()) { // getPart needs to use same "name" as input field in form
                Files.copy(input, Files.createTempFile(Paths.get("").toAbsolutePath(), "avatar", ".png"), StandardCopyOption.REPLACE_EXISTING);
            }
            catch(Exception e){
                e.printStackTrace();
            }
        });

    }

}
