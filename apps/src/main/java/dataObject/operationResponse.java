package dataObject;

/**
 * Created by xingo on 2016/11/29.
 */
public class operationResponse {
    public int id = 0;
    public String reason;
    public boolean success;
    public operationResponse(boolean isSuccess,int id){
        this.success = isSuccess;
        this.id = id;
    }
    public operationResponse(boolean isSuccess,String reason){
        this.success = isSuccess;
        this.reason = reason;
    }
}
