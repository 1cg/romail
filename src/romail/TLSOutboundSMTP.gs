package romail

uses javax.mail.Session
uses java.util.Properties
uses javax.mail.Authenticator
uses javax.mail.PasswordAuthentication

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/11/12
 * Time: 5:47 AM
 *
 * Outbond SMTP handler that uses TLS
 */
public class TLSOutboundSMTP extends OutboundSMTP {

  private static final var TLS_SUBMISSION_PORT = 587

  construct(serverName : String, portNum : int, serverUserName : String, serverPassword : String)
  {
    super(serverName, TLS_SUBMISSION_PORT, serverUserName, serverPassword)
  }

  override function buildSession(): Session {
    var sessionProps = new Properties()
    sessionProps.put("mail.smtp.host", Server)
    sessionProps.put("mail.smtp.port", Port)
    sessionProps.put("mail.smtp.auth", true)
    sessionProps.put("mail.smtp.starttls.enable", "true")
    var retVal = Session.getInstance(sessionProps, new Authenticator(){
      property get PasswordAuthentication(): PasswordAuthentication{
        return new PasswordAuthentication(UserName, Password)
      }
    })
    return(retVal)
  }
}