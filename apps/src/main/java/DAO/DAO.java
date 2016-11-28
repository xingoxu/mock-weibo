package DAO;

import com.google.gson.Gson;
import config.mysql;

import java.sql.*;

import dataObject.*;

/**
 * Created by xingo on 2016/11/28.
 */
public class DAO {
    public static Connection getConnection() throws ClassNotFoundException, SQLException {
        Class.forName(mysql.DRIVER_MYSQL);     //加载JDBC驱动
        return DriverManager.getConnection(mysql.URL);    //创建数据库连接对象
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

    public static boolean insert(String sql) {
        try {
            getConnection().prepareStatement(sql).executeUpdate();
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

    public static boolean update(String sql) {
        return insert(sql);
    }

    public static boolean delete(String sql) {
        return insert(sql);
    }

    public static User getUser(ResultSet dbResult) {
        if (dbResult == null)
            return null;
        User user = new User();
        try {
            dbResult.next();
            user.userid = dbResult.getInt("userid") + "";
            user.username = dbResult.getString("username") + "";
            user.intro = dbResult.getString("intro") + "";
            user.avatar = dbResult.getString("avatar") + "";
            user.area = dbResult.getString("area") + "";
            user.birthday = dbResult.getString("birthday") + "";
            user.mail = dbResult.getString("mail") + "";
        } catch (Exception e) {
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

    public static boolean register(String json) {
        registerObject registerObject = (new Gson()).fromJson(json, dataObject.registerObject.class);
        try
        {
            PreparedStatement statement = getConnection().prepareStatement("INSERT INTO user (username,password,email) VALUES (?,?,?)");
            statement.setString(1,registerObject.name);
            statement.setString(2,registerObject.password);
            statement.setString(3,registerObject.email);
            statement.executeUpdate();
        }
        catch (Exception e){
            return false;
        }
        return true;
    }
    //null 为登陆成功 其他为错误原因
    public static String login(String name,String password){
        User user = getUser(name);
        if(user == null)
            return "没有此用户";
        String sql = "SELECT * FROM user WHERE userid=" + user.userid;
        ResultSet resultSet = query(sql);
        try{
            resultSet.next();
            String resultPassword = resultSet.getString("password");
            if(resultPassword != password)
                return "密码错误";
        }catch (Exception e){

        }
        return null;
    }


}
