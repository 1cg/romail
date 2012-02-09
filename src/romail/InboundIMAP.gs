package romail

uses java.util.Properties
uses javax.mail.PasswordAuthentication
uses javax.mail.Authenticator
uses java.util.ArrayList
uses javax.mail.Store
uses javax.mail.Session
uses com.sun.org.apache.xml.internal.utils.StringVector
uses javax.mail.Folder
uses java.util.Set
uses java.util.HashSet
uses java.util.Map
uses java.util.HashMap

/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/22/12
 * Time: 11:43 AM
 */
class InboundIMAP extends MailServer{
  protected var _store: Store
  protected var _openedFolders : Map<String,EmailFolder>

  protected construct(serverName : String, uName : String, pword : String)
  {
    Server = serverName
    UserName = uName
    Password = pword
    _openedFolders = new HashMap<String, EmailFolder>()
    return
  }

  protected property get EmailStore() : Store
  {
    if(_store == null){
      _store = MailSession.getStore("imap")
      _store.connect()
    }
    return(_store)
  }

  override function close()
  {
    _openedFolders.Values.each( \ elt -> elt.close())
    _openedFolders.clear()
    _store.close()
    return
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

  /**
   * Unlike Javamail, Romail caches folders locally. This way operations on email messages (e.g. delete)
   * are visible everywhere someone asked for the folder XXX.
   */
  function getFolder(name: String): EmailFolder
  {
    var translatedFolderName = translateFolderName(name)
    var retVal: EmailFolder = _openedFolders.get(translatedFolderName)
    if(retVal == null){
      var folder = EmailStore.getFolder(name)
      if (folder.exists() == true){
        retVal = new EmailFolder(folder)
        _openedFolders.put(translatedFolderName, retVal)
      }
    }
    return(retVal)
  }

  /**
   * Folder name case sensitivity is implementation specific. See RFC3501 5.1. By default we treat them as
   * case sensitive. Inbox is however case-insensitive (ibid)
   */
  protected function translateFolderName(name : String) : String
  {
    var retVal = name
    if(name.toLowerCase().equals("inbox")){
      retVal = name.toLowerCase()
    }
    return(retVal)
  }

}