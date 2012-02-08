package romail

uses java.util.Properties
uses javax.mail.PasswordAuthentication
uses javax.mail.Authenticator
uses java.util.ArrayList
uses javax.mail.Store
uses javax.mail.Session
uses com.sun.org.apache.xml.internal.utils.StringVector
uses javax.mail.Folder

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/22/12
 * Time: 11:43 AM
 */
class InboundIMAP extends MailServer{
  protected var _store: Store

  protected construct(serverName : String, uName : String, pword : String)
  {
    Server = serverName
    UserName = uName
    Password = pword
    return
  }

  public property get Inbox() : EmailFolder
  {
    var basis = EmailStore.getFolder("Inbox")
    var retVal = new EmailFolder(basis)
    return(retVal)
  }

  protected property get EmailStore() : Store
  {
    if(_store == null){
      _store = MailSession.getStore("imap")
      _store.connect()
    }
    return(_store)
  }

  override protected function buildSession(): Session
  {
    var sessionProps = new Properties()
    sessionProps.put("mail.imap.user", UserName);
    sessionProps.put("mail.imap.host", Server);

    var retVal = Session.getInstance(sessionProps, new Authenticator(){
      property get PasswordAuthentication(): PasswordAuthentication{
        return new PasswordAuthentication(UserName, Password)
      }
    });
    return(retVal)
  }
}