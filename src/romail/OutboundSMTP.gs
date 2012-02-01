package romail

uses javax.mail.internet.MimeMessage
uses javax.mail.Message
uses javax.mail.Session
uses javax.mail.internet.InternetAddress
uses javax.mail.Transport
uses java.util.Properties

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/11/12
 * Time: 5:19 AM
 */

abstract class OutboundSMTP extends MailServer{
  var _port : int as Port

  protected construct(serverName : String, portNum : int, serverUserName : String, serverPassword : String)
  {
    Server = serverName
    Port = portNum
    UserName = serverUserName
    Password = serverPassword
  }

  public function sendEmail(email : Email)
  {
    var session = MailSession
    var message = convertToMessage(email, session)
    Transport.send(message)
    return
  }

  private function convertToMessage(email : Email, session : Session): Message
  {
    var retVal = new MimeMessage(session)
    retVal.setFrom(new InternetAddress(email.From))
    retVal.addRecipient(Message.RecipientType.TO, new InternetAddress(email.To))
    retVal.setSubject(email.Subject)
    retVal.setText(email.Text)
    return(retVal)
  }
}