package romail

uses java.util.Properties
uses javax.mail.Session
uses javax.mail.Authenticator
uses javax.mail.PasswordAuthentication

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/27/12
 * Time: 2:49 PM
 * To change this template use File | Settings | File Templates.
 */
class GmailInboundIMAP extends InboundIMAP{

  override function buildSession(): Session {
    var sessionProps = new Properties()
    sessionProps.put("mail.store.protocol", "imaps")
    sessionProps.put("mail.imaps.user", UserName)
    sessionProps.put("mail.imaps.host", Server)

    var retVal = Session.getInstance(sessionProps, new Authenticator(){
      property get PasswordAuthentication(): PasswordAuthentication{
        return new PasswordAuthentication(UserName, Password)
      }
    });
    return(retVal)
  }
}