/**
 * Created by xingo on 2016/11/23.
 */

import com.google.gson.Gson;
import spark.ModelAndView;
import spark.template.freemarker.FreeMarkerEngine;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        port(8888);
        get("/hello", (req, res) -> {
            System.out.println("test");
            firstObject object = new firstObject();
            object.a = "abc";
            object.b = 2323;
            Gson a = new Gson();

            return object;
        }, (new Gson())::toJson);

        get("/",(request, response) -> {
            Map<String,Object> attributes = new HashMap<>();
            firstObject object = new firstObject();
            object.a = "abc";
            object.b = 2323;
            attributes.put("test",(new Gson()).toJson(object));
            return new ModelAndView(attributes,"hello.ftl");
        },new FreeMarkerEngine());

    }
}

class firstObject {
    public String a;
    public int b;
}