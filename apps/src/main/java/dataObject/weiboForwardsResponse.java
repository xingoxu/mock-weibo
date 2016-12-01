package dataObject;

/**
 * Created by xingo on 2016/12/01.
 */
public class weiboForwardsResponse {
    public singleWeibo[] forwards;
    public int total;
    public weiboForwardsResponse(singleWeibo[] weibos, int total) {
        this.total = total;
        this.forwards = weibos;
    }
}
