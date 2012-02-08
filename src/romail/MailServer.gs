package romail

uses javax.mail.Session
/**
 * Created by IntelliJ IDEA.
 * User: rkitts
 * Date: 1/24/12
 * Time: 3:36 PM
 *
 * Simple base class for all types of mail servers. Just holds the basic information
    * e.g. username, password, etc
    */
abstract class MailServer {
  var _server : String as Server
  var _userName : String as UserName
  var _password : String as Password
  var _session : Session

  protected property get MailSession() : Session
  {
    if(_session == null){
      _session = buildSession()
    }
    return(_session)
  }

  abstract protected function buildSession() : Session
}