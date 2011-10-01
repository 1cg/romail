package romail

uses gw.util.GosuExceptionUtil

uses javax.mail.Message
uses javax.mail.Session
uses javax.mail.Transport
uses javax.mail.internet.InternetAddress
uses javax.mail.internet.MimeMessage
uses java.util.Properties
uses java.lang.IllegalStateException

public class Server {

  static var _DEFAULT : Server as Base = new Server()

  var _sendProtocol : SendProtocol as SendProtocol = SMTPS
  var _fetchProtocol : FetchProtocol as FetchProtocol = IMAPS
  var _sendServer : String as SendServer
  var _fetchServer : String as FetchServer
  var _userName : String as UserName
  var _password : String as Password

  function sendEmail(email : Email ) {
    if (!_sendServer?.HasContent) {
      throw new IllegalStateException("Need to set a URL for the email server!")
    }

    var props = new Properties()
    var session = Session.getInstance(props, null)
    var msg = new MimeMessage(session)
    for (to in email._to) {
      msg.addRecipient(Message.RecipientType.TO, to)
    }

    for (cc in email._cc) {
      msg.addRecipient(Message.RecipientType.CC, cc)
    }

    for (bcc in email._bcc) {
      msg.addRecipient(Message.RecipientType.BCC, bcc)
    }

    msg.Subject = email.Subject

    msg.setText( email.Text )

    msg.setFrom( email._from )

    msg.saveChanges()

    print( "getting transport" )
    var tr = session.getTransport(_sendProtocol.Val)
    print( "connecting" )
    tr.connect(_sendServer, _userName, _password)
    print( "sending" )
    tr.sendMessage(msg, msg.getAllRecipients())
    print( "closing" )
    tr.close()
  }

  function folder(name : String) : EmailFolder {
    return null
  }

  property get Inbox() : EmailFolder {
    return folder("INBOX")
  }

  public enum FetchProtocol {
    POP("pop3"),
    IMAP("imap"),
    IMAPS("imap")
    var _code : String as readonly Val
    private construct( c : String) {
      _code = c
    }
  }

  public enum SendProtocol {
    SMTP("smtp"),
    SMTPS("smtps")
    var _code : String as readonly Val
    private construct( c : String) {
      _code = c
    }
  }
}
