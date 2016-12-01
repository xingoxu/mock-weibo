package dataObject;

/**
 * Created by xingo on 2016/12/01.
 */
public class weiboCommentsResponse {
    public singleComment[] comments;
    public int total;
    public weiboCommentsResponse(singleComment[] comments, int total) {
        this.total = total;
        this.comments = comments;
    }
}
