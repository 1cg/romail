package romail

uses java.net.Inet4Address
uses java.net.InetAddress
uses java.util.Properties
uses javax.mail.Session
uses javax.mail.Authenticator
uses javax.mail.PasswordAuthentication
uses javax.mail.Transport
uses javax.mail.Message
uses javax.mail.internet.MimeMessage
uses javax.mail.internet.InternetAddress
uses javax.mail.Message.RecipientType

/**
 * The basis for email accounts. Accounts are presumed here to be either Pop or IMAP type accounts. This
 * class just holds the stuff that's common to both
 */
class Account {
  var _fullName: String as FullName
  var _emailAddress: String as EmailAddress
  // Incoming and outgoing servers. Out going is of course always an SMTP
  // server...
  var _incomingServer: String as IncomingServer
  var _outgoingServer: String as OutgoingSMTPServer
  var _userName: String as UserName
  var _password: String as Password

  public function send(email: Email)
  {
    var session = buildSession()
    var message = convertToMessage(email, session)
    var transport = session.getTransport("smtp")
    transport.connect(_outgoingServer, 587, UserName, Password)
    transport.sendMessage(message, message.getRecipients(RecipientType.TO))
    return
  }

  private function convertToMessage(email: Email, session : Session): Message
  {

    var retVal = new MimeMessage(session)
    if(email.From == null){
      retVal.setFrom(new InternetAddress(EmailAddress))
    }
    else{
      retVal.setFrom(new InternetAddress(email.From))
    }
    retVal.addRecipient(Message.RecipientType.TO, new InternetAddress(email.To))
    retVal.setSubject(email.Subject)
    retVal.setText(email.Text)
    return(retVal)
  }

  private function buildSession(): Session
  {
    var props = new Properties()
    props.put("mail.smtp.auth", "true")
    props.put("mail.smtp.starttls.enable", "true")
    props.put("mail.debug", "true")
    var retVal = Session.getDefaultInstance(props, null)
    return(retVal)
  }
}