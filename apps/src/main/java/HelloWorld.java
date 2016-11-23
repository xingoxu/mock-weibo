/**
 * Created by xingo on 2016/11/23.
 */
import com.google.gson.Gson;

import static spark.Spark.*;

public class HelloWorld {
    public static void main(String[] args) {
        port(8080);
        get("/hello", (req, res) -> {
            System.out.println("test");
            return new Object();
        },(new Gson())::toJson);

    }
}