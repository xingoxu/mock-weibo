/**
 * Created by xingo on 2016/11/23.
 */

import com.google.gson.Gson;
import dataObject.*;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.template.freemarker.FreeMarkerEngine;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

import DAO.DAO;

public class Router {
    public static void checkIfLogin(Request request, Response response) {
        if (request.requestMethod().equalsIgnoreCase("POST"))
            return;
        String userid = request.session().attribute("userid");
        request.session().attribute("test", "12345");
        if (userid != null)
            response.redirect("/");

    }

    public static void checkIfNotLogin(Request request, Response response) {
        String userid = request.session().attribute("userid");

        if (userid == null)
            response.redirect("/login");
    }

    public static String json_enc(Object object) {
        return (new Gson()).toJson(object);
    }

    public static void main(String[] args) {
        port(8888);
        staticFiles.externalLocation(Paths.get("").toAbsolutePath().toString() + "/src/main/resources/public"); // Static files

        post("/login", (request, response) -> {
            loginRequest loginRequest = (new Gson()).fromJson(request.body(), loginRequest.class);
            operationResponse operationResponse = DAO.login(loginRequest.username, loginRequest.password);
            if (operationResponse.success) {
                request.session().attribute("userid", operationResponse.id + "");
            }
            return operationResponse;
        }, (new Gson())::toJson);

        before("/login", Router::checkIfLogin);
        get("/login", (request, response) -> {
            return new ModelAndView(new HashMap<>(), "login.html");
        }, new FreeMarkerEngine());

        post("/register", (req, res) -> {
            operationResponse operationResponse = DAO.register(req.body());
            if (operationResponse.success) {
                req.session().attribute("userid", operationResponse.id + "");
            }
            return operationResponse;
        }, (new Gson())::toJson);

        before("/register", Router::checkIfLogin);
        get("/register", (req, res) -> {
            return new ModelAndView(new HashMap<>(), "register.html");
        }, new FreeMarkerEngine());


        get("/my-like", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("timeline", json_enc(DAO.likeTimeline(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
            //hotTopic
            return new ModelAndView(attributes, "my-like.html");
        }, new FreeMarkerEngine());
        post("/like", (req, res) -> {
            DAO.newLike(req.body());
            return new operationResponse(true, 0);
        }, (new Gson())::toJson);
        post("/like/delete", (req, res) -> {
            DAO.cancelLike(req.body());
            return new operationResponse(true, 0);
        }, (new Gson())::toJson);


        get("/favourite", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("timeline", json_enc(DAO.favouriteTimeline(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
            //hotTopic
            return new ModelAndView(attributes, "my-favourite.html");
        }, new FreeMarkerEngine());
        post("/favourite", (req, res) -> {
            DAO.favourite(req.body());
            return new operationResponse(true, 0);
        }, (new Gson())::toJson);

        post("/favourite/delete", (req, res) -> {
            DAO.cancelFavourite(req.body());
            return new operationResponse(true, 0);
        }, (new Gson())::toJson);

        get("/weibo/:weiboid", (req, res) -> {
            try {
                int userid = Integer.parseInt(req.session().attribute("userid"));
                int weiboid = Integer.parseInt(req.params(":weiboid"));
                singleWeibo weibo = DAO.getSingleWeibo(weiboid);
                weibo.favourited = DAO.getFavourited(userid, weiboid);
                weibo.liked = DAO.getLiked(userid, weiboid, false);
                Map<String, Object> attributes = new HashMap<>();
                attributes.put("weibo", json_enc(weibo));
                attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
                attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
                return new ModelAndView(attributes, "singleWeibo.html");
            } catch (Exception e) {
                e.printStackTrace();
                res.status(404);
                return new ModelAndView(new HashMap<>(), "404.html");
            }
        }, new FreeMarkerEngine());
        post("/weibo", (req, res) -> {
            return new operationResponse(true, DAO.newWeibo(req.body()));
        }, (new Gson())::toJson);


        post("/comment", (req, res) -> {
            return new operationResponse(true, DAO.newComment(req.body()));
        }, (new Gson())::toJson);

        post("/follow", (req, res) -> {
            DAO.follow(req.body());
            return new operationResponse(true, null);
        }, (new Gson())::toJson);
        post("/follow/delete", (req, res) -> {
            DAO.cancelFollow(req.body());
            return new operationResponse(true, null);
        }, (new Gson())::toJson);
        post("/follower/delete", (req, res) -> {
            DAO.removeFollower(req.body());
            return new operationResponse(true, null);
        }, (new Gson())::toJson);


        get("/forwards/:weiboid", (req, res) -> {
            singleWeibo[] weibos = DAO.forwardWeibos(Integer.parseInt(req.params(":weiboid")));
            return new weiboForwardsResponse(weibos, weibos.length);
        }, (new Gson())::toJson);
        get("/comments/:weiboid", (req, res) -> {
            try {
                int userid = Integer.parseInt(req.session().attribute("userid"));
                int weiboid = Integer.parseInt(req.params(":weiboid"));
                singleComment[] comments = DAO.getWeiboComments(weiboid);
                for (int i = 0; i < comments.length; i++) {
                    comments[i].liked = DAO.getLiked(userid, comments[i].commentid, true);
                }
                return new weiboCommentsResponse(comments, comments.length);
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }, (new Gson())::toJson);


        get("/userCard/id/:userid", (req, res) -> {
            int userid = Integer.parseInt(req.params(":userid"));
            int login_userid = Integer.parseInt(req.session().attribute("userid"));
            UserCard userCard = DAO.getUserCard(userid);
            DAO.setRelation(login_userid, userCard);
            return userCard;
        }, (new Gson())::toJson);
        get("/userCard/name/:username", (req, res) -> {
            String username = req.params(":username");
            int userid = Integer.parseInt(req.session().attribute("userid"));
            UserCard userCard = DAO.getUserCard(username);
            DAO.setRelation(userid, userCard);
            return userCard;
        }, (new Gson())::toJson);
        get("/user/:id", (req, res) -> {
            int login_userid = Integer.parseInt(req.session().attribute("userid"));
            int target_userid = Integer.parseInt(req.params(":id"));
            UserCard targetUserCard = DAO.getUserCard(target_userid);
            DAO.setRelation(login_userid, targetUserCard);
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("timeline", json_enc(DAO.userTimeline(target_userid, login_userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(login_userid)));
            attributes.put("targetUserCard", json_enc(targetUserCard));
            attributes.put("targetUser", json_enc(DAO.getUser(target_userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(login_userid)));
            return new ModelAndView(attributes, "personalPage.html");
        }, new FreeMarkerEngine());
        get("/user/name/:name", (req, res) -> {
            User user = DAO.getUser(req.params(":name"));
            if (user == null) {
                res.status(404);
                return new ModelAndView(new HashMap<>(), "404.html");
            }
            res.redirect("/user/" + user.userid);
            return new ModelAndView(new HashMap<>(), "404.html");
        }, new FreeMarkerEngine());
        get("/user/:id/follow", (req, res) -> {
            int login_userid = Integer.parseInt(req.session().attribute("userid"));
            int target_userid = Integer.parseInt(req.params(":id"));
            UserCard targetUserCard = DAO.getUserCard(target_userid);
            DAO.setRelation(login_userid, targetUserCard);
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("users", json_enc(DAO.getFollowingUsers(target_userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(login_userid)));
            attributes.put("targetUserCard", json_enc(targetUserCard));
            attributes.put("targetUser", json_enc(DAO.getUser(target_userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(login_userid)));
            return new ModelAndView(attributes, "following.html");
        }, new FreeMarkerEngine());
        get("/user/:id/fans", (req, res) -> {
            int login_userid = Integer.parseInt(req.session().attribute("userid"));
            int target_userid = Integer.parseInt(req.params(":id"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("users", json_enc(DAO.getFollowerUsers(target_userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(login_userid)));
            attributes.put("targetUserCard", json_enc(DAO.getUserCard(target_userid)));
            attributes.put("targetUser", json_enc(DAO.getUser(target_userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(login_userid)));
            return new ModelAndView(attributes, "following.html");
        }, new FreeMarkerEngine());

        get("/at", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("timeline", json_enc(DAO.atTimeline(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
//            DAO.setAtHasRead(userid);
            //hotTopic
            return new ModelAndView(attributes, "at.html");
        }, new FreeMarkerEngine());

        get("/comment", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("comments", json_enc(DAO.commentPageComments(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
//            DAO.setCommentHasRead(userid);
            //hotTopic
            return new ModelAndView(attributes, "comment.html");
        }, new FreeMarkerEngine());

        get("/like", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("likes", json_enc(DAO.likePageLikes(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
//            DAO.setLikeHasRead(userid);

            //hotTopic
            return new ModelAndView(attributes, "like.html");
        }, new FreeMarkerEngine());

        get("/search", (req, res) -> {
            String keyword = req.queryParams("keywords");
            int userid = Integer.parseInt(req.session().attribute("userid"));

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("keywords", json_enc(keyword));
            attributes.put("timeline", json_enc(DAO.getSearchWeibos(keyword, userid)));
            attributes.put("users", json_enc(DAO.getSearchUsers(keyword, userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
            return new ModelAndView(attributes, "search.html");
        }, new FreeMarkerEngine());

        get("/search/user", (req, res) -> {
            String keyword = req.queryParams("keywords");
            int userid = Integer.parseInt(req.session().attribute("userid"));

            Map<String, Object> attributes = new HashMap<>();
            attributes.put("keywords", json_enc(keyword));
            attributes.put("users", json_enc(DAO.getSearchUsers(keyword, userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
            return new ModelAndView(attributes, "searchUser.html");
        }, new FreeMarkerEngine());


        get("/logout", (req, res) -> {
            req.session().attribute("userid", null);
            res.redirect("/login");
            return "ok";
        });

        before("/", Router::checkIfNotLogin);
        get("/", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("timeline", json_enc(DAO.indexTimeline(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            attributes.put("notification", json_enc(DAO.getUserNotificationNumber(userid)));
            //hotTopic
            return new ModelAndView(attributes, "index.html");
        }, new FreeMarkerEngine());


    }
}