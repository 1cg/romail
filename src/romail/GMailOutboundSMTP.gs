package romail
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/8/12
 * Time: 11:03 AM
 * 
 * Really simple class that does little more than determine values for TLSOutboundSMTP
 */
public class GMailOutboundSMTP extends TLSOutboundSMTP
{
  public construct(userName : String, password : String)
  {
    super("smtp.gmail.com", 587, userName, password)
  }
}