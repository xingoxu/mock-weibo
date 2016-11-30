/**
 * Created by xingo on 2016/11/23.
 */

import com.google.gson.Gson;
import dataObject.loginRequest;
import dataObject.operationRequest;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.template.freemarker.FreeMarkerEngine;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

import DAO.DAO;
import dataObject.operationResponse;

public class HelloWorld {
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

        before("/login", (request, response) -> {
            checkIfLogin(request, response);
        });
        get("/login", (request, response) -> {
            return new ModelAndView(new HashMap<>(), "login.html");
        }, new FreeMarkerEngine());

        before("/register", (request, response) -> {
            checkIfLogin(request, response);
        });
        get("/register", (req, res) -> {
            return new ModelAndView(new HashMap<>(), "register.html");
        }, new FreeMarkerEngine());
        post("/like", (req, res) -> {
            DAO.newLike(req.body());
            return new operationResponse(true, 0);
        }, (new Gson())::toJson);

//        get("/comments/:id",(req,res)->{
//
//        })


        before("/", (request, response) -> {
            checkIfNotLogin(request, response);
        });
        get("/", (req, res) -> {
            int userid = Integer.parseInt(req.session().attribute("userid"));
            Map<String, Object> attributes = new HashMap<>();
            attributes.put("timeline", json_enc(DAO.indexTimeline(userid)));
            attributes.put("currentUser", json_enc(DAO.getUserCard(userid)));
            //hotTopic,notification
            return new ModelAndView(attributes, "index.html");
        }, new FreeMarkerEngine());

    }
}