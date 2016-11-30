package dataObject;

/**
 * Created by xingo on 2016/11/29.
 */
public class singleWeibo {
    public int weiboid;
    public UserCard user;
    public String text;
    public String time;
    public int forward_weiboid;
    public int forward;
    public int comment;
    public int like;
    public boolean favourited;
    public boolean liked;
    public singleWeibo forwardWeibo = null;
    public String[] ats;
}
