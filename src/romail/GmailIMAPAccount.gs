package romail
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 2/8/12
 * Time: 11:15 AM
 */
class GmailIMAPAccount extends IMAPAccount{

  construct(userName : String, password : String)
  {
    super(new GmailInboundIMAP(userName, password), new GMailOutboundSMTP(userName, password))
  }
}

